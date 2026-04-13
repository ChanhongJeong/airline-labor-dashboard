#!/usr/bin/env python3
"""minWageHistory를 2019~2026 (8년)으로 확장."""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

# 2019~2021 추가 데이터 (공식 발표 기준)
HISTORY_EXT = {
    "KR": [
        {"year": 2019, "value": 8350},
        {"year": 2020, "value": 8590},
        {"year": 2021, "value": 8720},
    ],
    "JP": [
        {"year": 2019, "value": 901},
        {"year": 2020, "value": 902},
        {"year": 2021, "value": 930},
    ],
    "CN": [
        {"year": 2019, "value": 2480},
        {"year": 2020, "value": 2480},
        {"year": 2021, "value": 2590},
    ],
    "TW": [
        {"year": 2019, "value": 23100},
        {"year": 2020, "value": 23800},
        {"year": 2021, "value": 24000},
    ],
    "HK": [
        {"year": 2019, "value": 37.5},
        {"year": 2020, "value": 37.5},
        {"year": 2021, "value": 37.5},
    ],
    "MO": [
        {"year": 2019, "value": 6240},
        {"year": 2020, "value": 6240},
        {"year": 2021, "value": 6240},
    ],
    "VN": [
        {"year": 2019, "value": 4180000},
        {"year": 2020, "value": 4420000},
        {"year": 2021, "value": 4420000},
    ],
    "PH": [
        {"year": 2019, "value": 537},
        {"year": 2020, "value": 537},
        {"year": 2021, "value": 537},
    ],
    "TH": [
        {"year": 2019, "value": 325},
        {"year": 2020, "value": 331},
        {"year": 2021, "value": 336},
    ],
    "MY": [
        {"year": 2019, "value": 1100},
        {"year": 2020, "value": 1200},
        {"year": 2021, "value": 1200},
    ],
    "SG": [
        {"year": 2019, "value": 0},
        {"year": 2020, "value": 0},
        {"year": 2021, "value": 1200},
    ],
    "ID": [
        {"year": 2019, "value": 3940973},
        {"year": 2020, "value": 4276350},
        {"year": 2021, "value": 4416186},
    ],
    "MN": [
        {"year": 2019, "value": 320000},
        {"year": 2020, "value": 420000},
        {"year": 2021, "value": 420000},
    ],
    "RU": [
        {"year": 2019, "value": 11280},
        {"year": 2020, "value": 12130},
        {"year": 2021, "value": 12792},
    ],
    "LA": [
        {"year": 2019, "value": 1100000},
        {"year": 2020, "value": 1100000},
        {"year": 2021, "value": 1100000},
    ],
    "MP": [
        {"year": 2019, "value": 7.25},
        {"year": 2020, "value": 7.25},
        {"year": 2021, "value": 7.25},
    ],
}

def main():
    text = DATA_JS.read_text(encoding="utf-8")
    match = re.search(r"window\.DASHBOARD_DATA\s*=\s*(\{.*\})\s*;\s*$", text, re.DOTALL)
    data = json.loads(match.group(1))

    for country in data["countries"]:
        code = country["code"]
        if code not in HISTORY_EXT:
            continue

        hist = country.get("minWageHistory", [])
        existing_years = {h["year"] for h in hist}

        for entry in HISTORY_EXT[code]:
            if entry["year"] not in existing_years:
                hist.append(entry)

        country["minWageHistory"] = sorted(hist, key=lambda h: h["year"])
        print(f"[EXT] {code:4} | {len(country['minWageHistory'])} years: "
              f"{country['minWageHistory'][0]['year']}~{country['minWageHistory'][-1]['year']}")

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
    print(f"\n[DONE] 16개국 minWageHistory 2019~2026 확장 완료")

if __name__ == "__main__":
    main()
