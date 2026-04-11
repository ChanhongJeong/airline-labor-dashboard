# ✈️ 제주항공 GHR 대시보드 — by. jychoi

제주항공 취항 15개국의 **최저임금 / 물가상승률 / 노동법 / 수당 공식 / 근로계약 필수항목**을 한곳에서 확인하는 웹 대시보드.

## 기능

- 🌏 15개국 카드 뷰 (일본, 중국, 대만, 홍콩, 마카오, 베트남, 필리핀, 태국, 말레이시아, 싱가포르, 인도네시아, 몽골, 러시아, 라오스, 사이판)
- 💰 최저임금 **실시간 원화 환산** (open.er-api.com)
- 📊 물가상승률(CPI) **자동 갱신** (World Bank API, GitHub Actions 주기 실행)
- 📈 5년치 최저임금 추이 차트 (순수 SVG, 외부 라이브러리 無)
- 💵 **법정 수당 공식**: 연장·야간·휴일·공휴일 산식 & 근거
- 📝 **근로계약서 필수 항목** 국가별 정리
- 🎌 공휴일, 🛂 한국인 비자 요건
- 📥 **CSV 내보내기** (Excel 한글 호환, UTF-8 BOM)
- 📱 PC + 모바일 반응형

## 파일 구조

```
airline-labor-dashboard/
├── index.html                    # 메인 페이지
├── data.js                       # 국가별 데이터 (window.DASHBOARD_DATA)
├── scripts/
│   └── update_data.py            # World Bank CPI 자동 갱신 스크립트
├── .github/
│   └── workflows/
│       └── update.yml            # 매주 월요일 자동 실행 (KST 12:00)
└── README.md
```

## 로컬에서 열기

### 방법 1: Python 로컬 서버 (환율 API 정상 동작, 권장)

```bash
cd airline-labor-dashboard
python3 -m http.server 8765
# 브라우저에서 열기
open http://localhost:8765/
```

### 방법 2: 파일 직접 열기

`index.html` 더블클릭. 환율 API가 CORS로 막힐 수 있지만 나머지 기능은 동작.

## 데이터 자동 갱신 구조

### 물가상승률 (CPI) — 자동
- **소스**: World Bank API (`FP.CPI.TOTL.ZG`)
- **주기**: 매주 월요일 UTC 03:00 (KST 12:00), GitHub Actions 자동 실행
- **대상**: 대만(TW) 제외 14개국 (대만은 World Bank 미포함 → 수동)
- **CNMI**: 미국 CPI 사용 (worldBankCode: USA)
- ⚠️ World Bank 연간 데이터는 **1~2년 lag**가 있습니다. 최신 월간 수치는 각국 통계청 링크 참고.

### 최저임금 — 수동 (공개 API 없음)
- 각 국가 `minWage.updated` 필드에 기준일 명시
- 새 최저임금이 고시되면 `data.js`에서 해당 국가의 `minWage` 및 `minWageHistory`만 수정
- ILO, Trading Economics, 각국 노동부 고시를 주기적으로 확인 필요

### 환율 — 클라이언트 fetch
- `open.er-api.com/v6/latest/USD` (무료, API 키 불필요)
- 페이지 로드 시 자동, 서버 저장 없음

## 수동으로 CPI 갱신 실행

```bash
cd airline-labor-dashboard
python3 scripts/update_data.py
```

## GitHub Pages 배포

1. 이 폴더를 GitHub 저장소로 푸시
2. Settings → Pages → Source: `main` branch / root
3. 배포된 URL로 접속 (환율 API 정상 동작)

## 수동 최저임금 업데이트 체크리스트

각 국가 갱신 주기 참고:

| 국가 | 일반 갱신 시기 |
|---|---|
| 일본 | 매년 10월 (중앙최저임금심의회) |
| 대만 | 매년 1월 |
| 홍콩 | 격년 5월 |
| 마카오 | 격년 |
| 말레이시아 | 비정기 (2~3년) |
| 싱가포르 | PWM 직종별 상이 |
| 인도네시아 | 매년 1월 (UMP 대통령령) |
| 베트남 | 비정기 (2년 간격) |
| 필리핀 | 지역별 Wage Order |
| 태국 | 비정기 (특정 업종·지역) |
| 러시아 | 매년 1월 (МРОТ) |
| 몽골 | 비정기 |
| 중국 | 지역별, 비정기 |
| 라오스 | 비정기 (고인플레로 수시) |
| 사이판(CNMI) | 미 연방법 동결 중 |

## 주의사항

- 모든 수치는 **참고용**입니다. 노무 판단, 임금 협상, 계약 체결 전 반드시 **각 국가 공식 링크**에서 재확인하세요.
- 수당 공식은 일반 원칙이며, 업종·직군·단체협약에 따라 상이할 수 있습니다.
- 근로계약서 필수 항목은 법령 개정에 따라 바뀔 수 있습니다.

## 라이선스 & 기여

내부 참고 자료. 데이터 오류 발견 시 `data.js` 직접 수정 후 PR.

---

**문의**: 제주항공 내부 사용
