#!/usr/bin/env python3
"""
IMF WEO API에서 물가상승률(PCPIPCH) 가져와 data.js 업데이트.
World Bank보다 최신 데이터 제공 (예측치 포함).
API: https://www.imf.org/external/datamapper/api/v1/PCPIPCH
"""
from __future__ import annotations
import json, re, sys, urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

IMF_ENDPOINT = "https://www.imf.org/external/datamapper/api/v1/PCPIPCH?periods={year}"

# data.js country code → IMF country code 매핑
CODE_MAP = {
    "KR": "KOR", "JP": "JPN", "CN": "CHN", "TW": "TWN",
    "HK": "HKG", "MO": "MAC", "VN": "VNM", "PH": "PHL",
    "TH": "THA", "MY": "MYS", "SG": "SGP", "ID": "IDN",
    "MN": "MNG", "RU": "RUS", "LA": "LAO", "MP": "USA"  # CNMI uses US data
}


def trend_from_rate(rate: float) -> dict:
    if rate >= 5:
        return {"text": "고물가", "dir": "up"}
    if rate >= 2:
        return {"text": "상승", "dir": "up"}
    if rate >= 0.5:
        return {"text": "안정", "dir": "flat"}
    return {"text": "저물가", "dir": "down"}


def main():
    text = DATA_JS.read_text(encoding="utf-8")
    match = re.search(r"window\.DASHBOARD_DATA\s*=\s*(\{.*\})\s*;\s*$", text, re.DOTALL)
    data = json.loads(match.group(1))

    today = date.today().isoformat()

    # 최신 연도부터 시도 (2025 → 2024 fallback)
    for try_year in [2025, 2024]:
        url = IMF_ENDPOINT.format(year=try_year)
        print(f"[FETCH] IMF WEO PCPIPCH {try_year}")
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "jju-dashboard/1.0"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                payload = json.loads(resp.read().decode("utf-8"))
            imf_data = payload.get("values", {}).get("PCPIPCH", {})
            if imf_data:
                print(f"  → {len(imf_data)} countries loaded")
                break
        except Exception as e:
            print(f"  [WARN] {e}")
            imf_data = {}

    if not imf_data:
        print("[ERROR] IMF data fetch failed")
        return 1

    updated = 0
    for country in data["countries"]:
        code = country["code"]
        imf_code = CODE_MAP.get(code)
        if not imf_code:
            continue

        country_vals = imf_data.get(imf_code, {})
        rate = country_vals.get(str(try_year))
        if rate is None:
            print(f"  [SKIP] {code}: no data for {try_year}")
            continue

        rate = round(float(rate), 2)
        country["inflation"]["rate"] = rate
        country["inflation"]["year"] = try_year
        country["inflation"]["display"] = f"+{rate}%" if rate >= 0 else f"{rate}%"
        country["inflation"]["trend"] = trend_from_rate(rate)
        country["inflation"]["updated"] = today
        print(f"  [UPD] {code:4} → {rate}% ({try_year})")
        updated += 1

    # meta 갱신
    data["meta"]["lastUpdated"] = today
    data["meta"]["cpiSource"] = f"IMF WEO API (PCPIPCH, {try_year})"

    header = (
        "// ==========================================================\n"
        "// 제주항공 취항지 노동법·물가·최저임금 대시보드 데이터\n"
        "// ----------------------------------------------------------\n"
        "// inflation.rate / inflation.year 는 scripts/update_cpi_imf.py\n"
        "// 스크립트가 IMF WEO API(PCPIPCH)에서 자동 갱신.\n"
        "// minWage 관련 필드는 공식 API 부재로 수동 업데이트.\n"
        "// GitHub Actions 주기적 실행 → 커밋.\n"
        "// ==========================================================\n"
    )
    body = json.dumps(data, ensure_ascii=False, indent=2)
    DATA_JS.write_text(header + "window.DASHBOARD_DATA = " + body + ";\n", encoding="utf-8")

    print(f"\n[DONE] {updated}개국 CPI 갱신 (IMF WEO {try_year})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
