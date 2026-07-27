# data.js 백업

`data.js`(= `window.DASHBOARD_DATA`)를 JSON으로 떠서 보관하는 폴더입니다.

## 백업 만들기

```bash
node scripts/backup_data.js                    # backup/data-YYYY-MM-DD.json
node scripts/backup_data.js --label 작업내용     # backup/data-YYYY-MM-DD-작업내용.json
```

같은 날 같은 라벨로 다시 실행하면 `-2`, `-3` … 이 붙어 **기존 백업을 덮어쓰지 않습니다.**

## 파일 구조

각 백업 JSON 최상단에 `_backup` 메타가 붙습니다. 나머지는 `DASHBOARD_DATA` 원본 그대로입니다.

```jsonc
{
  "_backup": {
    "source": "data.js",
    "backedUpAt": "2026-07-27T…",   // 백업 시각 (UTC)
    "sourceBytes": 392851,           // 원본 data.js 크기
    "sourceSha256": "5cc586b4…",     // 원본 data.js 해시 — 어느 시점 파일인지 대조용
    "countryCount": 16,
    "countryCodes": ["KR", "CN", …],
    "label": "after-VN-CN-HK-TW"
  },
  "countries": [ … ]
}
```

## 복원

백업은 **JSON**이고 배포되는 원본은 `window.DASHBOARD_DATA = {…};` 형태의 **JS**이므로 그대로 덮어쓸 수 없습니다. 복원할 때는 `_backup` 키를 뺀 나머지를 다시 감싸주세요.

```bash
node -e "
const fs=require('fs');
const {_backup, ...data} = JSON.parse(fs.readFileSync('backup/data-2026-07-27-after-VN-CN-HK-TW.json','utf8'));
fs.writeFileSync('data.js', 'window.DASHBOARD_DATA = ' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
"
node --check data.js
```

> ⚠️ 복원하면 원본의 줄바꿈·들여쓰기 형태가 `JSON.stringify` 기준으로 재정렬되어 git diff가 크게 잡힐 수 있습니다. 특정 국가만 되돌릴 때는 전체 복원 대신 해당 국가 객체만 꺼내 쓰는 편이 안전합니다.

## 백업 이력

| 파일 | 시점 | 내용 |
|---|---|---|
| `data-2026-07-27-before-VN-CN-HK-TW.json` | 11차 작업 **전** | 9·10차 작업(라오스 정정, 홍콩 6건, 근로시간 16개국) 반영 완료 상태 |
| `data-2026-07-27-after-VN-CN-HK-TW.json` | 11차 작업 **후** | 베트남·중국·홍콩·대만 심화 블록 보강 완료 상태 |

## 참고

- GitHub Actions가 매주 월요일 `data.js`의 CPI 필드를 자동 갱신합니다. 백업 시점과 배포본의 `inflation` 값이 다를 수 있습니다.
- 작업 이력 전체는 프로젝트 루트의 `history.md`를 보세요.
