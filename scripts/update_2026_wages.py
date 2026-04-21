#!/usr/bin/env python3
"""
전체 16개국 최저임금을 2026년 최신 데이터로 업데이트.

출처:
- 한국: 고용노동부 2026년 적용 최저임금 고시 (₩10,320/시)
- 일본: 厚生労働省 FY2025 지역별 최저임금 (2025.10~, 전국 평균 ¥1,121)
- 중국: 人社部 2026.1 기준 각 성·시 최저임금 (상하이 ¥2,740 등)
- 대만: 勞動部 2026.1 최저임금 NT$29,500/월
- 홍콩: Minimum Wage Commission 2026.5.1 HK$43.1/시
- 마카오: 2026.1.1 MOP 7,280/월
- 베트남: Nghị định 293 (2026.1.1, 지역 I VND 5,310,000)
- 필리핀: NWPC NCR WO-26 (2025.7~, ₱695/일)
- 태국: 2024.10 ฿400/일 유지
- 말레이시아: RM 1,700/월 유지
- 인도네시아: Jakarta UMP 2026 IDR 5,729,876
- 몽골: 2025.4 MNT 792,000
- 러시아: 2026.1 RUB 27,093
- 라오스: 2025 LAK 2,500,000
- CNMI: US$7.25 유지
"""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

# ============================================================
# 2026년 최저임금 데이터
# code: { minWage override, history 2026 value, regional updates }
# ============================================================

UPDATES = {
    "KR": {
        "minWage": {
            "amount": 10320, "unit": "시",
            "display": "₩10,320 / 시",
            "sub": "전국 단일 · 월 ₩2,156,880 (209h)",
            "updated": "2026-01-01",
            "trend": {"text": "+2.9%", "dir": "up", "note": "10,030 → 10,320"}
        },
        "history2026": 10320,
        "regional": [
            {"cities": ["전국 (서울·부산·인천·제주 등)"], "amount": 10320, "display": "₩10,320/시 (월 ₩2,156,880)", "note": "2026.1.1 개정 · 전국 단일"}
        ]
    },
    "JP": {
        "minWage": {
            "amount": 1121, "unit": "시",
            "display": "¥1,121 / 시",
            "sub": "전국 가중평균 · FY2025 (2025.10~)",
            "updated": "2025-10-01",
            "trend": {"text": "+6.3%", "dir": "up", "note": "1,055 → 1,121 (전국 평균)"}
        },
        "history2026": 1121,
        "regional": [
            {"cities": ["도쿄 (東京)"], "amount": 1226, "display": "¥1,226/시", "note": "FY2025 · 전국 최고"},
            {"cities": ["오사카 (大阪)"], "amount": 1177, "display": "¥1,177/시"},
            {"cities": ["나고야 (愛知)"], "amount": 1140, "display": "¥1,140/시"},
            {"cities": ["고베 (兵庫)"], "amount": 1102, "display": "¥1,102/시"},
            {"cities": ["시즈오카 (静岡)"], "amount": 1097, "display": "¥1,097/시"},
            {"cities": ["삿포로 (北海道)", "하코다테 (北海道)"], "amount": 1071, "display": "¥1,071/시", "note": "홋카이도 都道府県 단일"},
            {"cities": ["히로시마 (広島)"], "amount": 1070, "display": "¥1,070/시"},
            {"cities": ["후쿠오카 (福岡)"], "amount": 1057, "display": "¥1,057/시"},
            {"cities": ["가고시마 (鹿児島)"], "amount": 1025, "display": "¥1,025/시"},
            {"cities": ["마쓰야마 (愛媛)", "오이타 (大分)", "오키나와 (沖縄)"], "amount": 1023, "display": "¥1,023/시", "note": "FY2025 최저 구간 · 전 도도부현 ¥1,000 돌파"}
        ]
    },
    "CN": {
        "minWage": {
            "amount": 2740, "unit": "월",
            "display": "¥2,740 / 월",
            "sub": "상하이 기준 · 지역별 상이",
            "updated": "2025-04-01",
            "trend": {"text": "+1.9%", "dir": "up", "note": "2,690 → 2,740 (상하이)"}
        },
        "history2026": 2740,
        "regional": [
            {"cities": ["상하이 (上海)"], "amount": 2740, "display": "¥2,740/월", "note": "2025 개정 · 전국 최고"},
            {"cities": ["베이징 (北京)"], "amount": 2540, "display": "¥2,540/월", "note": "2025 개정"},
            {"cities": ["칭다오 (青岛)", "스자좡 (石家庄)"], "amount": 2400, "display": "¥2,400/월", "note": "산동·허베이 1급 (2025 개정)"},
            {"cities": ["웨이하이 (威海)"], "amount": 2200, "display": "¥2,200/월", "note": "산동 2급 (2025 개정)"},
            {"cities": ["옌지 (延吉)"], "amount": 2000, "display": "¥2,000/월", "note": "지린 1급 (2025 추정)"},
            {"cities": ["하얼빈 (哈尔滨)"], "amount": 1960, "display": "¥1,960/월", "note": "헤이룽장 1급 (2025 추정)"},
            {"cities": ["장가계 (张家界)"], "amount": 1850, "display": "¥1,850/월", "note": "후난 2급 (2025 추정)"},
            {"cities": ["자무스 (佳木斯)"], "amount": 1790, "display": "¥1,790/월", "note": "헤이룽장 2급 (2025 추정)"}
        ]
    },
    "TW": {
        "minWage": {
            "amount": 29500, "unit": "월",
            "display": "NT$29,500 / 월",
            "sub": "시급 NT$196",
            "updated": "2026-01-01",
            "trend": {"text": "+3.18%", "dir": "up", "note": "28,590 → 29,500"}
        },
        "history2026": 29500,
        "regional": [
            {"cities": ["타이베이 (台北)", "가오슝 (高雄)"], "amount": 29500, "display": "NT$29,500/월 (시급 NT$196)", "note": "전국 단일 · 2026.1 개정"}
        ]
    },
    "HK": {
        "minWage": {
            "amount": 43.1, "unit": "시",
            "display": "HK$43.1 / 시",
            "sub": "2026.5.1 개정",
            "updated": "2026-05-01",
            "trend": {"text": "+2.4%", "dir": "up", "note": "42.1 → 43.1"}
        },
        "history2026": 43.1
    },
    "MO": {
        "minWage": {
            "amount": 35, "unit": "시",
            "display": "MOP 35 / 시",
            "sub": "월 MOP 7,280 · 2026.1 개정",
            "updated": "2026-01-01",
            "trend": {"text": "+9.4%", "dir": "up", "note": "32 → 35 (시급)"}
        },
        "history2026": 7280
    },
    "VN": {
        "minWage": {
            "amount": 5310000, "unit": "월",
            "display": "VND 5,310,000 / 월",
            "sub": "지역 I (하노이·호치민 등)",
            "updated": "2026-01-01",
            "trend": {"text": "+7.1%", "dir": "up", "note": "4,960,000 → 5,310,000 (지역 I)"}
        },
        "history2026": 5310000,
        "regional": [
            {"cities": ["하노이 도심 (Ha Noi)", "다낭 도심 (Da Nang)"], "amount": 5310000, "display": "VND 5,310,000/월", "note": "지역 I · Nghị định 293 (2026.1.1)"},
            {"cities": ["나트랑 (Nha Trang)", "푸꾸옥 (Phu Quoc)"], "amount": 4710000, "display": "VND 4,710,000/월", "note": "지역 II · 2026.1.1 개정"}
        ]
    },
    "PH": {
        "minWage": {
            "amount": 695, "unit": "일",
            "display": "₱695 / 일",
            "sub": "NCR 비농업 · 2025.7 개정",
            "updated": "2025-07-18",
            "trend": {"text": "+₱50", "dir": "up", "note": "645 → 695 (NCR)"}
        },
        "history2026": 695,
        "regional": [
            {"cities": ["마닐라 (NCR)"], "amount": 695, "display": "₱695/일", "note": "WO-26 (2025.7.18~) · 비농업"},
            {"cities": ["세부 (Cebu Class A)"], "amount": 533, "display": "₱533/일", "note": "Region VII Class A 2025 개정 추정"},
            {"cities": ["클락 (Pampanga)"], "amount": 530, "display": "₱530/일", "note": "Region III 2025 개정 추정"},
            {"cities": ["보홀 (Bohol)"], "amount": 480, "display": "₱480/일", "note": "Region VII Class B 2025 개정 추정"}
        ]
    },
    "TH": {
        "minWage": {
            "amount": 400, "unit": "일",
            "display": "฿400 / 일",
            "sub": "전국 확대 적용 목표 (2024.10~)",
            "updated": "2024-10-01",
            "trend": {"text": "유지", "dir": "flat", "note": "2026 추가 인상 미정"}
        },
        "history2026": 400
    },
    "MY": {
        "minWage": {
            "amount": 1700, "unit": "월",
            "display": "RM 1,700 / 월",
            "sub": "5인 이상 사업장",
            "updated": "2025-02-01",
            "trend": {"text": "유지", "dir": "flat", "note": "2025.2 이후 변동 없음"}
        },
        "history2026": 1700
    },
    "ID": {
        "minWage": {
            "amount": 5729876, "unit": "월",
            "display": "IDR 5,729,876 / 월",
            "sub": "자카르타 UMP 2026",
            "updated": "2026-01-01",
            "trend": {"text": "+6.2%", "dir": "up", "note": "5,396,761 → 5,729,876 (자카르타)"}
        },
        "history2026": 5729876,
        "regional": [
            {"cities": ["바탐 (Batam, Kepulauan Riau)"], "amount": 4980000, "display": "IDR 4,980,000/월", "note": "Batam UMK 2026 추정 (+6%)"},
            {"cities": ["발리 (Bali - Denpasar UMK)"], "amount": 3283000, "display": "IDR 3,283,000/월", "note": "Denpasar UMK 2026 추정 (+6%)"}
        ]
    },
    "MN": {
        "minWage": {
            "amount": 792000, "unit": "월",
            "display": "MNT 792,000 / 월",
            "sub": "2025.4.1 개정",
            "updated": "2025-04-01",
            "trend": {"text": "+20.0%", "dir": "up", "note": "660,000 → 792,000"}
        },
        "history2026": 792000
    },
    "RU": {
        "minWage": {
            "amount": 27093, "unit": "월",
            "display": "RUB 27,093 / 월",
            "sub": "МРОТ 연방 기준 · 2026.1 개정",
            "updated": "2026-01-01",
            "trend": {"text": "+20.7%", "dir": "up", "note": "22,440 → 27,093"}
        },
        "history2026": 27093,
        "regional": [
            {"cities": ["블라디보스톡 (Vladivostok, 연해주)"], "amount": 32512, "display": "RUB 32,512/월", "note": "МРОТ 27,093 × 지역계수 1.2 (2026 추정)"}
        ]
    },
    "LA": {
        "minWage": {
            "amount": 2500000, "unit": "월",
            "display": "LAK 2,500,000 / 월",
            "sub": "2025 개정",
            "updated": "2025-05-01",
            "trend": {"text": "+56.3%", "dir": "up", "note": "1,600,000 → 2,500,000 (대폭 인상)"}
        },
        "history2026": 2500000,
        "regional": [
            {"cities": ["비엔티안 (Vientiane)"], "amount": 2500000, "display": "LAK 2,500,000/월", "note": "전국 단일 · 2025 개정"}
        ]
    },
    "SP": {
        "minWage": {
            "amount": 7.25, "unit": "시",
            "display": "US$7.25 / 시",
            "sub": "미 연방 최저임금",
            "updated": "2009-07-24",
            "trend": {"text": "동결", "dir": "flat", "note": "연방 기준 유지"}
        },
        "history2026": 7.25
    },
    "SG": {
        # 싱가포르는 최저임금 없음 - 변동 없음
    }
}


def main():
    text = DATA_JS.read_text(encoding="utf-8")
    match = re.search(r"window\.DASHBOARD_DATA\s*=\s*(\{.*\})\s*;\s*$", text, re.DOTALL)
    data = json.loads(match.group(1))

    updated = 0
    for country in data["countries"]:
        code = country["code"]
        if code not in UPDATES or not UPDATES[code]:
            continue

        upd = UPDATES[code]

        # 1) minWage 전체 교체
        if "minWage" in upd:
            country["minWage"] = upd["minWage"]

        # 2) minWageHistory에 2026 추가 (기존 2021 제거 → 2022~2026 5개)
        if "history2026" in upd:
            hist = country.get("minWageHistory", [])
            # 이미 2026 있으면 업데이트, 없으면 추가
            has_2026 = any(h["year"] == 2026 for h in hist)
            if has_2026:
                for h in hist:
                    if h["year"] == 2026:
                        h["value"] = upd["history2026"]
            else:
                hist.append({"year": 2026, "value": upd["history2026"]})
            # 2021 제거 (5개 유지: 2022~2026)
            hist = [h for h in hist if h["year"] >= 2022]
            country["minWageHistory"] = sorted(hist, key=lambda h: h["year"])

        # 3) minWageRegional 업데이트
        if "regional" in upd and "minWageRegional" in country:
            country["minWageRegional"]["regions"] = upd["regional"]

        updated += 1
        print(f"[UPD] {code:4} | {country['minWage']['display']:25} | trend: {country['minWage']['trend']['text']}")

    # meta 갱신
    data["meta"]["lastUpdated"] = "2026-04-13"

    header = (
        "// ==========================================================\n"
        "// 제주항공 취항지 노동법·물가·최저임금 대시보드 데이터\n"
        "// ----------------------------------------------------------\n"
        "// inflation.rate / inflation.year 는 scripts/update_data.py\n"
        "// 스크립트가 World Bank API(FP.CPI.TOTL.ZG)에서 자동 갱신.\n"
        "// minWage 관련 필드는 공식 API 부재로 수동 업데이트.\n"
        "// GitHub Actions 주기적 실행(scripts/update_data.py) → 커밋.\n"
        "// ==========================================================\n"
    )
    body = json.dumps(data, ensure_ascii=False, indent=2)
    DATA_JS.write_text(header + "window.DASHBOARD_DATA = " + body + ";\n", encoding="utf-8")

    print(f"\n[DONE] {updated}개국 최저임금 2026년 데이터로 업데이트")


if __name__ == "__main__":
    main()
