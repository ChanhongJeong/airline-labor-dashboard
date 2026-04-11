#!/usr/bin/env python3
"""
data.js 의 inflation 필드를 World Bank API로 자동 갱신한다.

- 지표: FP.CPI.TOTL.ZG (Inflation, consumer prices, annual %)
- World Bank API는 연간 데이터이며 보통 1~2년의 lag가 있다.
- Taiwan은 World Bank에 미포함 → 수동 값 유지 (worldBankCode: null).
- CNMI(MP)는 미국 데이터를 사용 (worldBankCode: USA).

사용법:
  python scripts/update_data.py
"""
from __future__ import annotations

import json
import re
import sys
import urllib.request
import urllib.error
from datetime import date
from pathlib import Path
from typing import Optional, Tuple

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

WB_ENDPOINT = (
    "https://api.worldbank.org/v2/country/{code}/indicator/FP.CPI.TOTL.ZG"
    "?format=json&date=2018:{year}&per_page=20"
)


def load_data_js() -> Tuple[str, dict]:
    text = DATA_JS.read_text(encoding="utf-8")
    # window.DASHBOARD_DATA = { ... }; 의 JSON 부분 추출
    match = re.search(
        r"window\.DASHBOARD_DATA\s*=\s*(\{.*\})\s*;\s*$",
        text,
        re.DOTALL,
    )
    if not match:
        print("ERROR: data.js 에서 DASHBOARD_DATA 객체를 찾지 못했습니다.", file=sys.stderr)
        sys.exit(1)
    return text, json.loads(match.group(1))


def write_data_js(data: dict) -> None:
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


def fetch_cpi(wb_code: str, until_year: int) -> Optional[Tuple[float, int]]:
    """World Bank에서 가장 최근 non-null CPI 값을 가져온다."""
    url = WB_ENDPOINT.format(code=wb_code, year=until_year)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "jju-dashboard-updater/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"  [WARN] {wb_code} fetch failed: {e}", file=sys.stderr)
        return None

    if not isinstance(payload, list) or len(payload) < 2 or not payload[1]:
        return None

    # 최신 연도부터 non-null 찾기
    for entry in payload[1]:
        val = entry.get("value")
        if val is not None:
            return round(val, 2), int(entry["date"])
    return None


def trend_from_rate(rate: float) -> dict:
    if rate >= 5:
        return {"text": "고물가", "dir": "up"}
    if rate >= 2:
        return {"text": "상승", "dir": "up"}
    if rate >= 0.5:
        return {"text": "안정", "dir": "flat"}
    return {"text": "저물가", "dir": "down"}


def format_display(rate: float) -> str:
    sign = "+" if rate >= 0 else ""
    return f"{sign}{rate}%"


def main() -> int:
    print(f"[INFO] Reading {DATA_JS}")
    _, data = load_data_js()

    today = date.today()
    until_year = today.year
    today_str = today.isoformat()

    updated_count = 0
    skipped = []

    for country in data["countries"]:
        code = country["code"]
        wb_code = country.get("worldBankCode")
        name = country["name"]

        if not wb_code:
            print(f"[SKIP] {code} {name}: worldBankCode 없음 (수동 관리)")
            skipped.append(code)
            continue

        print(f"[FETCH] {code} {name} ← World Bank {wb_code}")
        result = fetch_cpi(wb_code, until_year)
        if result is None:
            print(f"  [WARN] {code}: 값을 가져오지 못함, 기존 값 유지")
            continue

        rate, year = result
        country["inflation"]["rate"] = rate
        country["inflation"]["year"] = year
        country["inflation"]["display"] = format_display(rate)
        country["inflation"]["trend"] = trend_from_rate(rate)
        country["inflation"]["updated"] = today_str
        print(f"  → {rate}% ({year})")
        updated_count += 1

    # meta 갱신
    data["meta"]["lastUpdated"] = today_str

    write_data_js(data)
    print(f"\n[DONE] {updated_count}개 국가 CPI 갱신, {len(skipped)}개 skipped: {skipped}")
    print(f"[OUT ] {DATA_JS}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
