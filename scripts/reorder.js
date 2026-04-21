// 국가 순서 재배치 스크립트
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data.js');
const src = fs.readFileSync(DATA_PATH, 'utf8');

// window.DASHBOARD_DATA = {...}; 로딩
const evalContext = { window: {} };
const fn = new Function('window', src);
fn(evalContext.window);
const data = evalContext.window.DASHBOARD_DATA;

// 목표 순서: 한국, 중국, 러시아, 몽골, 대만, 홍콩, 마카오, 사이판, 일본, 필리핀, 베트남, 태국, 라오스, 말레이시아, 싱가포르, 인도네시아
const TARGET_ORDER = ['KR', 'CN', 'RU', 'MN', 'TW', 'HK', 'MO', 'SP', 'JP', 'PH', 'VN', 'TH', 'LA', 'MY', 'SG', 'ID'];

const byCode = Object.fromEntries(data.countries.map(c => [c.code, c]));
const reordered = TARGET_ORDER.map(code => {
  if (!byCode[code]) throw new Error(`Missing code: ${code}`);
  return byCode[code];
});

if (reordered.length !== data.countries.length) {
  throw new Error(`국가 수 불일치: ${reordered.length} vs ${data.countries.length}`);
}

data.countries = reordered;

// 기존 포맷(들여쓰기 2)과 동일하게 직렬화
const out = '// Auto-updated by GitHub Actions\nwindow.DASHBOARD_DATA = ' +
  JSON.stringify(data, null, 2) + ';\n';

fs.writeFileSync(DATA_PATH, out, 'utf8');
console.log('✓ 국가 순서 재배치 완료:', TARGET_ORDER.join(' → '));
