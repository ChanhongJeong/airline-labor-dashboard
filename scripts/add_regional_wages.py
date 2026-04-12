#!/usr/bin/env python3
"""
제주항공 취항 지점별 최저임금 데이터 추가 (minWageRegional 필드).
최저임금이 같은 지역은 cities 배열로 묶음.

출처:
- 일본: 厚生労働省 地域別最低賃金 FY2024 (2024.10 개정)
- 중국: 각 성·직할시 정부 발표 최저임금 2023~2024
- 대만: 勞動部 2025.1 개정
- 베트남: Nghị định 74/2024/ND-CP (2024.7) 4개 지역 분류
- 필리핀: NWPC 지역별 Wage Order 2024
- 태국: 총리실 공고 2024.10
- 인도네시아: 각 주 UMP·UMK 2025
- 말레이시아: Minimum Wage Order 2024 (2025.2 시행)
- 러시아: МРОТ + 지역 계수
- 몽골·라오스: 전국 단일
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

# ============================================================
# 지점별 최저임금 데이터
# ============================================================

REGIONAL_WAGES = {
    "JP": {
        "unit": "시",
        "basis": "都道府県별 시급 (厚生労働省 FY2024, 2024.10 개정)",
        "regions": [
            {"cities": ["도쿄 (東京)"], "amount": 1163, "display": "¥1,163/시", "note": "전국 최고"},
            {"cities": ["오사카 (大阪)"], "amount": 1114, "display": "¥1,114/시"},
            {"cities": ["나고야 (愛知)"], "amount": 1077, "display": "¥1,077/시"},
            {"cities": ["고베 (兵庫)"], "amount": 1052, "display": "¥1,052/시"},
            {"cities": ["시즈오카 (静岡)"], "amount": 1034, "display": "¥1,034/시"},
            {"cities": ["히로시마 (広島)"], "amount": 1020, "display": "¥1,020/시"},
            {"cities": ["삿포로 (北海道)", "하코다테 (北海道)"], "amount": 1010, "display": "¥1,010/시", "note": "홋카이도 都道府県 단일"},
            {"cities": ["후쿠오카 (福岡)"], "amount": 992, "display": "¥992/시"},
            {"cities": ["마쓰야마 (愛媛)"], "amount": 956, "display": "¥956/시"},
            {"cities": ["오이타 (大分)"], "amount": 954, "display": "¥954/시"},
            {"cities": ["가고시마 (鹿児島)"], "amount": 953, "display": "¥953/시"},
            {"cities": ["오키나와 (沖縄)"], "amount": 952, "display": "¥952/시", "note": "전국 최저"}
        ]
    },
    "CN": {
        "unit": "월",
        "basis": "각 성·직할시 최저임금 (1~4등급 구분, 2023~2024 최신)",
        "regions": [
            {"cities": ["상하이 (上海)"], "amount": 2690, "display": "¥2,690/월", "note": "2023.7 개정 · 전국 최고"},
            {"cities": ["베이징 (北京)"], "amount": 2420, "display": "¥2,420/월", "note": "2023.9 개정"},
            {"cities": ["칭다오 (青岛)", "스자좡 (石家庄)"], "amount": 2200, "display": "¥2,200/월", "note": "산동 1급 (2023.10) / 허베이 1급 (2024.1)"},
            {"cities": ["웨이하이 (威海)"], "amount": 2010, "display": "¥2,010/월", "note": "산동 2급 (2023.10)"},
            {"cities": ["옌지 (延吉)"], "amount": 1880, "display": "¥1,880/월", "note": "지린성 1급 (2022.10)"},
            {"cities": ["하얼빈 (哈尔滨)"], "amount": 1860, "display": "¥1,860/월", "note": "헤이룽장 1급 (2023.9)"},
            {"cities": ["장가계 (张家界)"], "amount": 1740, "display": "¥1,740/월", "note": "후난성 2급 (추정)"},
            {"cities": ["자무스 (佳木斯)"], "amount": 1690, "display": "¥1,690/월", "note": "헤이룽장 2급 (2023.9)"}
        ]
    },
    "TW": {
        "unit": "월",
        "basis": "勞動部 전국 단일 월급 (2025.1 개정)",
        "regions": [
            {"cities": ["타이베이 (台北)", "가오슝 (高雄)"], "amount": 28590, "display": "NT$28,590/월", "note": "전 지역 단일 (시급 NT$190)"}
        ]
    },
    "VN": {
        "unit": "월",
        "basis": "Nghị định 74/2024/ND-CP 4개 지역 분류 (2024.7 개정)",
        "regions": [
            {"cities": ["하노이 도심 (Ha Noi)", "다낭 도심 (Da Nang)"], "amount": 4960000, "display": "VND 4,960,000/월", "note": "지역 I (도시 중심부)"},
            {"cities": ["나트랑 (Nha Trang)", "푸꾸옥 (Phu Quoc)"], "amount": 4410000, "display": "VND 4,410,000/월", "note": "지역 II (주요 도시 외곽·관광지)"}
        ]
    },
    "PH": {
        "unit": "일",
        "basis": "NWPC 지역별 Wage Order (2024 개정, 비농업 기준)",
        "regions": [
            {"cities": ["마닐라 (NCR)"], "amount": 645, "display": "₱645/일", "note": "WO-25 (2024.7) · 비농업 · 전국 최고"},
            {"cities": ["세부 (Cebu Class A)"], "amount": 501, "display": "₱501/일", "note": "Region VII Class A (Cebu City, Lapu-Lapu, Mandaue, Talisay) 2024"},
            {"cities": ["클락 (Pampanga)"], "amount": 500, "display": "₱500/일", "note": "Region III Central Luzon · 2024"},
            {"cities": ["보홀 (Bohol)"], "amount": 455, "display": "₱455/일", "note": "Region VII Class B (Bohol 일부 지역) · 2024"}
        ]
    },
    "TH": {
        "unit": "일",
        "basis": "총리실 임금위원회 지역·업종별 공고 (2024.10)",
        "regions": [
            {"cities": ["방콕 4성+ 호텔 (Bangkok)", "치앙마이 4성+ 호텔 (Chiang Mai)"], "amount": 400, "display": "฿400/일", "note": "2024.10 인상 · 4성 이상 호텔 등 특정 업종"},
            {"cities": ["방콕 일반 (Bangkok)"], "amount": 372, "display": "฿372/일", "note": "2024.1 기본 · 일반 업종"},
            {"cities": ["치앙마이 일반 (Chiang Mai)"], "amount": 350, "display": "฿350/일", "note": "2024.1 기본 · 일반 업종"}
        ]
    },
    "MY": {
        "unit": "월",
        "basis": "Minimum Wages Order 2024 (2025.2 시행, 전국 단일)",
        "regions": [
            {"cities": ["코타키나발루 (Kota Kinabalu, Sabah)"], "amount": 1700, "display": "RM 1,700/월", "note": "전국 단일 · 5인 이상 기업 (5인 미만 2025.8부터)"}
        ]
    },
    "ID": {
        "unit": "월",
        "basis": "각 주 UMP·UMK 2025 (대통령령 PP 51/2023)",
        "regions": [
            {"cities": ["바탐 (Batam, Kepulauan Riau)"], "amount": 4685050, "display": "IDR 4,685,050/월", "note": "Batam UMK 2025 · 자유무역지대·산업단지로 상대적 고임금"},
            {"cities": ["발리 (Bali - Denpasar UMK)"], "amount": 3096823, "display": "IDR 3,096,823/월", "note": "Denpasar UMK 2025 · Bali UMP 2,996,500보다 높음 (관광 중심지)"}
        ]
    },
    "RU": {
        "unit": "월",
        "basis": "МРОТ 연방 최저 + 연해주 지역 계수 (2025)",
        "regions": [
            {"cities": ["블라디보스톡 (Vladivostok, 연해주)"], "amount": 26928, "display": "RUB 26,928/월", "note": "연방 МРОТ 22,440 × 지역 계수 1.2 + 기타 수당 (2025 추정)"}
        ]
    },
    "MN": {
        "unit": "월",
        "basis": "전국 단일 (2024.1 개정)",
        "regions": [
            {"cities": ["울란바토르 (Улаанбаатар)"], "amount": 660000, "display": "MNT 660,000/월", "note": "전국 단일"}
        ]
    },
    "LA": {
        "unit": "월",
        "basis": "전국 단일 (2023.10 개정)",
        "regions": [
            {"cities": ["비엔티안 (Vientiane)"], "amount": 1600000, "display": "LAK 1,600,000/월", "note": "전국 단일"}
        ]
    }
}

# ============================================================
# 실행
# ============================================================

def main():
    text = DATA_JS.read_text(encoding="utf-8")
    match = re.search(
        r"window\.DASHBOARD_DATA\s*=\s*(\{.*\})\s*;\s*$",
        text,
        re.DOTALL,
    )
    if not match:
        raise SystemExit("DASHBOARD_DATA not found")

    data = json.loads(match.group(1))

    added = 0
    for country in data["countries"]:
        code = country["code"]
        if code not in REGIONAL_WAGES:
            continue
        country["minWageRegional"] = REGIONAL_WAGES[code]
        added += 1
        print(f"[ADD] {code}: {len(REGIONAL_WAGES[code]['regions'])} region tiers")

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

    print(f"\n[DONE] minWageRegional 필드 추가: {added}개국")


if __name__ == "__main__":
    main()
