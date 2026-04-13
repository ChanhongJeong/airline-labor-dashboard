#!/usr/bin/env python3
"""
일괄 업데이트:
1) inflationHistory 추가 (IMF WEO 2019~2025)
2) 최대 연장시간(maxOvertime) labor 배열에 추가
3) 인도네시아 미사용 연차 규정 보완
4) 필리핀 수습 6개월 × 재계약 보완
"""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

# ============================================================
# 1) IMF CPI 히스토리 (2019~2025)
# ============================================================
CPI_HISTORY = {
    "KR": [{"year":2019,"rate":0.4},{"year":2020,"rate":0.5},{"year":2021,"rate":2.5},{"year":2022,"rate":5.1},{"year":2023,"rate":3.6},{"year":2024,"rate":2.3},{"year":2025,"rate":2.0}],
    "JP": [{"year":2019,"rate":0.5},{"year":2020,"rate":0.0},{"year":2021,"rate":-0.2},{"year":2022,"rate":2.5},{"year":2023,"rate":3.3},{"year":2024,"rate":2.7},{"year":2025,"rate":3.3}],
    "CN": [{"year":2019,"rate":2.9},{"year":2020,"rate":2.5},{"year":2021,"rate":0.9},{"year":2022,"rate":2.0},{"year":2023,"rate":0.2},{"year":2024,"rate":0.2},{"year":2025,"rate":0.0}],
    "TW": [{"year":2019,"rate":0.6},{"year":2020,"rate":-0.2},{"year":2021,"rate":2.0},{"year":2022,"rate":2.9},{"year":2023,"rate":2.5},{"year":2024,"rate":2.2},{"year":2025,"rate":1.7}],
    "HK": [{"year":2019,"rate":2.9},{"year":2020,"rate":0.3},{"year":2021,"rate":1.6},{"year":2022,"rate":1.9},{"year":2023,"rate":2.1},{"year":2024,"rate":1.7},{"year":2025,"rate":1.7}],
    "MO": [{"year":2019,"rate":2.8},{"year":2020,"rate":0.8},{"year":2021,"rate":0.0},{"year":2022,"rate":1.0},{"year":2023,"rate":0.9},{"year":2024,"rate":0.7},{"year":2025,"rate":0.5}],
    "VN": [{"year":2019,"rate":2.8},{"year":2020,"rate":3.2},{"year":2021,"rate":1.8},{"year":2022,"rate":3.2},{"year":2023,"rate":3.3},{"year":2024,"rate":3.6},{"year":2025,"rate":3.4}],
    "PH": [{"year":2019,"rate":2.4},{"year":2020,"rate":2.4},{"year":2021,"rate":3.9},{"year":2022,"rate":5.8},{"year":2023,"rate":6.0},{"year":2024,"rate":3.2},{"year":2025,"rate":1.6}],
    "TH": [{"year":2019,"rate":0.7},{"year":2020,"rate":-0.8},{"year":2021,"rate":1.2},{"year":2022,"rate":6.1},{"year":2023,"rate":1.2},{"year":2024,"rate":0.4},{"year":2025,"rate":0.2}],
    "MY": [{"year":2019,"rate":0.7},{"year":2020,"rate":-1.1},{"year":2021,"rate":2.5},{"year":2022,"rate":3.4},{"year":2023,"rate":2.5},{"year":2024,"rate":1.8},{"year":2025,"rate":1.6}],
    "SG": [{"year":2019,"rate":0.6},{"year":2020,"rate":-0.2},{"year":2021,"rate":2.3},{"year":2022,"rate":6.1},{"year":2023,"rate":4.8},{"year":2024,"rate":2.4},{"year":2025,"rate":0.9}],
    "ID": [{"year":2019,"rate":2.8},{"year":2020,"rate":2.0},{"year":2021,"rate":1.6},{"year":2022,"rate":4.1},{"year":2023,"rate":3.7},{"year":2024,"rate":2.3},{"year":2025,"rate":1.8}],
    "MN": [{"year":2019,"rate":7.3},{"year":2020,"rate":3.7},{"year":2021,"rate":7.4},{"year":2022,"rate":15.1},{"year":2023,"rate":10.4},{"year":2024,"rate":6.2},{"year":2025,"rate":8.3}],
    "RU": [{"year":2019,"rate":4.5},{"year":2020,"rate":3.4},{"year":2021,"rate":6.7},{"year":2022,"rate":13.7},{"year":2023,"rate":5.9},{"year":2024,"rate":8.4},{"year":2025,"rate":9.0}],
    "LA": [{"year":2019,"rate":3.3},{"year":2020,"rate":5.1},{"year":2021,"rate":3.8},{"year":2022,"rate":23.0},{"year":2023,"rate":31.2},{"year":2024,"rate":23.1},{"year":2025,"rate":7.8}],
    "SP": [{"year":2019,"rate":1.8},{"year":2020,"rate":1.3},{"year":2021,"rate":4.7},{"year":2022,"rate":8.0},{"year":2023,"rate":4.1},{"year":2024,"rate":3.0},{"year":2025,"rate":2.7}],
}

# ============================================================
# 2) 최대 연장시간 (법정 초과근로 한도)
# ============================================================
MAX_OVERTIME = {
    "KR": "주 12시간 한도 (근로기준법 §53). 특별연장: 재난·사고 등 고용노동부 인가 시 추가 가능",
    "JP": "월 45시간·년 360시간 (36協定 일반). <strong>특별조항: 월 100시간 미만·년 720시간</strong> (노동기준법 §36). 2~6개월 평균 80시간 이하",
    "CN": "일 3시간·<strong>월 36시간</strong> (노동법 §41). 근로자 동의 필수. 위반 시 벌금",
    "TW": "월 46시간 (노동기준법 §32). 노사 합의 시 월 54시간·3개월 138시간 (2018 개정). 일 최대 12시간",
    "HK": "법정 연장시간 한도 없음 (계약 자유). Employment Ordinance에 상한 미규정",
    "MO": "일 2시간 한도 (Law 7/2008). 연간 총량은 합리적 범위",
    "VN": "일 최대 4시간·<strong>월 40시간·년 200시간</strong> (노동법 2019 §107). 특수 업종 년 300시간",
    "PH": "법정 연장시간 한도 없음 (Labor Code). 단 야간·위험 업종 별도 제한",
    "TH": "주 36시간 한도 (LPA §24). 위험 업종은 주 총 48시간 포함 연장 금지",
    "MY": "월 104시간 한도 (Employment Act §60A). 고용부 승인 시 연장 가능",
    "SG": "월 72시간 한도 (Employment Act §38). MOM 면제 승인 시 추가 가능. Part IV 적용자만",
    "ID": "일 4시간·주 18시간 한도 (Cipta Kerja PP 35/2021 §78). 근로자 서면 동의 필수",
    "MN": "일 4시간 한도 (노동법 2021). 연간 총량은 단체협약",
    "RU": "2일 연속 4시간·<strong>년 120시간</strong> 한도 (노동법 §99). 근로자 서면 동의 + 노조 의견",
    "LA": "일 3시간·년 45일(약 135시간) 한도 (Labor Law §51). 근로자 동의 필수",
    "SP": "FLSA 한도 없음 (40시간 초과분 150%만 규정). CW-1 비자 조건별 제한 가능",
}

# ============================================================
# 3) 인도네시아 미사용 연차 보완
# ============================================================
ID_ANNUAL_LEAVE_FIX = {
    "statutory": "12개월 근속 12일 (매년 리셋) — Cipta Kerja 옴니버스법 §79",
    "grantRule": "12개월 근속 필수. 6년 근속 시 '장기 휴식(istirahat panjang)' 2개월 (일부 기업·단체협약)",
    "compensation": {
        "required": "퇴직 시 의무",
        "formula": "퇴직 시 미사용 연차는 <strong>권리대체수당(uang penggantian hak)</strong>으로 일급 환산 지급. 근로 중 환산은 법 명시 없음",
        "note": "⚠️ <strong>근로 중 미사용 연차 누적 여부</strong>: 법령상 이월·누적 관련 명시 없음 → <strong>사내 규정(Peraturan Perusahaan)으로 '당해 연도 미사용분 소멸(hangus)' 명시 가능</strong>. 소멸 규정 없으면 누적 위험. <strong>보상 회피 방법</strong>: ① 사내 규정에 '미사용 연차 당해 연도 말 소멸' 조항 명시 ② 사용 촉진 서면 통지(연차 사용 기회 부여 증빙) ③ 퇴직 시에만 미사용분 uang penggantian hak 지급 의무 발생. 사내 규정 누락 시 전 기간 미사용분 누적 주장 가능 → 반드시 PP/PKB에 명시"
    },
    "carryover": {
        "allowed": "사내 규정에 따름",
        "maxYears": "법 명시 없음 — PP(사내규정)으로 결정",
        "detail": "⚠️ <strong>법령상 이월 규정 없음</strong>. 대부분 기업은 PP에 '6개월 이월 후 소멸' 또는 '당해 연도 소멸'로 명시. 미명시 시 근로자가 퇴직까지 누적 주장 가능"
    },
    "consent": "이월·소멸은 PP(사내규정) 또는 PKB(단체협약)에 명시 필수",
    "specialObligation": "Idul Fitri 전후 집중 사용 관행 — 사용자 거부 어려움. THR 지급과 연계",
    "tip": "⚠️ <strong>핵심: PP(사내규정)에 '미사용 연차 소멸' 조항 반드시 포함</strong>. 없으면 퇴직 시 전 기간 미사용분 누적 → 대규모 정산 리스크. Kemnaker 등록 PP에 해당 조항 포함 후 근로자 서명 확보"
}

# ============================================================
# 4) 필리핀 수습·계약 보완
# ============================================================
PH_FIXED_TERM_FIX = {
    "max": "수습(Probationary): <strong>6개월 1회</strong> (Labor Code §296). 고정기간(Fixed-term): 프로젝트·계절성만 허용 (Brent School vs Zamora 판례)",
    "conversion": "수습 6개월 초과 근무 시 <strong>자동 regular(정규직) 간주</strong>. 수습 '갱신'은 법적으로 불가 — 2번째 수습 계약은 circumvention(우회)으로 부당고용 판정 위험",
    "legalBasis": "Labor Code Art. 296 (구 Art. 281) + Brent School vs Zamora (G.R. No. 48494) 판례",
    "note": "⚠️ <strong>'수습 6개월 × 2회' 관행에 대한 법적 판단</strong>: Labor Code §296은 수습을 <strong>1회 6개월 한도</strong>로 규정. 종료 후 재고용(2차 수습)은 NLRC·대법원 판례에서 반복적으로 <strong>security of tenure 침해</strong>로 판정. <strong>다만</strong>: ① 1차 수습 종료 → 정당한 사유로 미채용 통지 → 이후 <strong>별도 직무·별도 부서</strong>로 신규 수습 채용은 인정될 수 있음 (직무 동일성 없는 경우) ② <strong>Fixed-term contract</strong>(고정기간 계약)는 수습과 별개 — Brent School 판례에 따라 합리적 사유(프로젝트·시즌) 있으면 6개월 계약 갱신 가능하나 반복 시 regular 간주 위험. ⚠️ <strong>동일 직무·동일 근로자에게 수습 2회 적용은 위법 리스크 매우 높음</strong>"
}


def main():
    text = DATA_JS.read_text(encoding="utf-8")
    match = re.search(r"window\.DASHBOARD_DATA\s*=\s*(\{.*\})\s*;\s*$", text, re.DOTALL)
    data = json.loads(match.group(1))

    for country in data["countries"]:
        code = country["code"]

        # 1) inflationHistory
        if code in CPI_HISTORY:
            country["inflationHistory"] = CPI_HISTORY[code]
            print(f"[CPI] {code:4} | {len(CPI_HISTORY[code])} years")

        # 2) maxOvertime → labor 배열 끝에 추가 + detailedLabor에 항목 추가
        if code in MAX_OVERTIME:
            country["detailedLabor"]["최대 연장시간"] = MAX_OVERTIME[code]
            # labor 배열에 1줄 추가 (중복 방지)
            overtime_exists = any("최대 연장" in l or "연장 한도" in l for l in country.get("labor", []))
            if not overtime_exists:
                country["labor"].append(f"최대 연장: {MAX_OVERTIME[code][:60]}...")

        # 3) 인도네시아 연차 보완
        if code == "ID":
            country["annualLeave"] = ID_ANNUAL_LEAVE_FIX
            print("[FIX] ID annualLeave (미사용 누적·소멸 PP 조항 보완)")

        # 4) 필리핀 수습·계약 보완
        if code == "PH":
            country["fixedTermContract"] = PH_FIXED_TERM_FIX
            print("[FIX] PH fixedTermContract (수습 6개월 × 2회 법적 판단 보완)")

    header = text[:text.index("window.DASHBOARD_DATA")]
    body = json.dumps(data, ensure_ascii=False, indent=2)
    DATA_JS.write_text(header + "window.DASHBOARD_DATA = " + body + ";\n", encoding="utf-8")

    print(f"\n[DONE] inflationHistory 16개국 + maxOvertime 16개국 + ID·PH 보완")


if __name__ == "__main__":
    main()
