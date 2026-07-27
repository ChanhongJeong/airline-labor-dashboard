#!/usr/bin/env node
/**
 * data.js -> backup/data-YYYY-MM-DD[-n].json 백업
 *
 * 사용법:
 *   node scripts/backup_data.js              # 오늘 날짜로 백업 (같은 날 재실행 시 -2, -3 … 으로 증가)
 *   node scripts/backup_data.js --label 작업내용   # 파일명 뒤에 라벨 추가
 *
 * data.js는 `window.DASHBOARD_DATA = {...}` 형태의 전역 할당이므로
 * window 셰임을 두고 require 한 뒤 JSON으로 직렬화한다.
 * 백업본에는 원본 해시·크기·국가 수를 _backup 메타로 함께 남겨
 * 나중에 어느 시점 파일인지 대조할 수 있게 한다.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'data.js');
const DIR = path.join(ROOT, 'backup');

const labelArg = process.argv.indexOf('--label');
const label = labelArg > -1 ? process.argv[labelArg + 1] : '';

const raw = fs.readFileSync(SRC, 'utf8');
global.window = {};
require(SRC);
const data = global.window.DASHBOARD_DATA;
if (!data || !Array.isArray(data.countries)) {
  console.error('DASHBOARD_DATA.countries 를 찾을 수 없습니다. data.js 구조를 확인하세요.');
  process.exit(1);
}

fs.mkdirSync(DIR, { recursive: true });

const d = new Date();
const stamp = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
  .map((v, i) => (i ? String(v).padStart(2, '0') : v)).join('-');

const base = `data-${stamp}${label ? '-' + label : ''}`;
let file = path.join(DIR, `${base}.json`);
for (let n = 2; fs.existsSync(file); n++) file = path.join(DIR, `${base}-${n}.json`);

const payload = {
  _backup: {
    source: 'data.js',
    backedUpAt: d.toISOString(),
    sourceBytes: Buffer.byteLength(raw, 'utf8'),
    sourceSha256: crypto.createHash('sha256').update(raw, 'utf8').digest('hex'),
    countryCount: data.countries.length,
    countryCodes: data.countries.map(c => c.code),
    label: label || undefined,
  },
  ...data,
};

fs.writeFileSync(file, JSON.stringify(payload, null, 2), 'utf8');
console.log(`백업 완료: backup/${path.basename(file)}`);
console.log(`  국가 ${data.countries.length}개 / 원본 ${(payload._backup.sourceBytes / 1024).toFixed(1)} KB`);
console.log(`  sha256 ${payload._backup.sourceSha256.slice(0, 16)}…`);
