// GitHub Actions 8818695 커밋의 CPI 업데이트를 내 HEAD에 반영
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data.js');
const src = fs.readFileSync(DATA_PATH, 'utf8');
const ctx = { window: {} };
new Function('window', src)(ctx.window);
const data = ctx.window.DASHBOARD_DATA;

// 1) 메타 업데이트
data.meta.lastUpdated = '2026-04-20';

// 2) 모든 국가의 inflation.updated → 2026-04-20
for (const c of data.countries) {
  if (c.inflation) c.inflation.updated = '2026-04-20';
}

// 3) 국가별 rate/display/trend 업데이트
const CPI_UPDATES = {
  KR: { rate: 2.1, display: '+2.1%' },
  JP: { rate: 3.2, display: '+3.2%' },
  HK: { rate: 1.4, display: '+1.4%' },
  MO: { rate: 0.3, display: '+0.3%', trend: { text: '저물가', dir: 'down' } },
  VN: { rate: 3.3, display: '+3.3%' },
  PH: { rate: 1.7, display: '+1.7%' },
  TH: { rate: -0.1, display: '-0.1%' },
  MY: { rate: 1.4, display: '+1.4%' },
  ID: { rate: 1.9, display: '+1.9%' },
  MN: { rate: 8.6, display: '+8.6%' },
  RU: { rate: 8.7, display: '+8.7%' },
  LA: { rate: 7.7, display: '+7.7%' },
};

for (const [code, upd] of Object.entries(CPI_UPDATES)) {
  const c = data.countries.find(cc => cc.code === code);
  if (!c) { console.warn(`skip: ${code} not found`); continue; }
  c.inflation.rate = upd.rate;
  c.inflation.display = upd.display;
  if (upd.trend) c.inflation.trend = upd.trend;
}

const out = '// Auto-updated by GitHub Actions\nwindow.DASHBOARD_DATA = ' +
  JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(DATA_PATH, out, 'utf8');
console.log('✓ CPI 업데이트 반영 완료');
console.log('  변경 국가:', Object.keys(CPI_UPDATES).join(', '));
