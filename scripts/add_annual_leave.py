#!/usr/bin/env python3
"""
15개국에 annualLeave 필드를 주입하는 일회성 스크립트.
연차 일수·미사용 보상 의무·산식·이월 규정·동의서 요건을 국가별 법제에 맞춰 기록.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

ANNUAL_LEAVE = {
    "JP": {
        "statutory": "근속 6개월 10일 → 1.5년 11일 → 2.5년 12일 → ... → 6.5년+ 20일 (최대 20일)",
        "grantRule": "주 5일·풀타임 기준. 파트타임은 비례 지급 (노동기준법 제39조)",
        "compensation": {
            "required": False,
            "formula": "원칙 없음. 퇴직 시 미사용분 금전 환산은 사용자 재량 (관행상 지급)",
            "note": "근로 중 금전 환산은 법적으로 권장 안 됨 — 연차는 휴식권이라는 취지"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "1년 (소멸시효 2년)",
            "detail": "당해 연도 미사용분은 다음 연도까지 사용 가능. 2년 후 소멸 (노동기준법 제115조 소멸시효)"
        },
        "consent": "자동 이월 (별도 동의서 불필요)",
        "specialObligation": "⚠️ 연 5일 이상 취득 의무 (2019~, 働き方改革) — 사용자가 시계(時季) 지정해서라도 5일 사용시켜야 함. 미이행 시 근로자 1인당 최대 30만엔 벌금",
        "tip": "실무상 유급휴가 소진 관리가 엄격. 연 5일 의무 취득 체크 + 이월분 소멸 전 통보 필수"
    },
    "CN": {
        "statutory": "1~10년 근속 5일 / 10~20년 10일 / 20년+ 15일 (연차휴가조례 2008)",
        "grantRule": "근속 1년 이상 필수. 연차휴가조례(年休条例) + 실시규정(实施办法)",
        "compensation": {
            "required": True,
            "formula": "사용자 업무 필요로 미사용 시 일급 × 300% (평상 일급 100% + 추가 200%) 지급 의무",
            "note": "근로자 자발적 포기는 서면 확인 시 보상 의무 없음. 국유기업·외자기업 분쟁 빈발"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "1년 (원칙 당해 연도 소진, 업무 필요 시 1년 이월 가능)",
            "detail": "사용자 사유로 이월 시에만 허용. 근로자 자발 이월은 제한"
        },
        "consent": "이월 시 근로자 서면 동의 필수 (분쟁 예방용)",
        "specialObligation": "서면 연차 계획(年休计划) 수립 의무. 노동감찰 시 자주 점검",
        "tip": "300% 지급 의무를 피하려면 연말까지 소진 or 서면 포기서 확보. 외국인도 동일 적용"
    },
    "TW": {
        "statutory": "6개월 3일 / 1년 7일 / 2년 10일 / 3년 14일 / 5년 15일 / 10년+ 매년 +1일 (최대 30일) — 노동기준법 §38 (2017 개정)",
        "grantRule": "계속 근로 6개월 이상. 파트타임 비례 지급",
        "compensation": {
            "required": True,
            "formula": "미사용분 × 일급 환산. 사용자 사유 미사용이든 연도 종료 시점이든 동일 지급 의무",
            "note": "2017 개정 후 '근로자 자발 미사용도 연말 환산 의무' 명확화"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "1년 (합의 시 1회)",
            "detail": "사용자·근로자 합의 시 다음 연도 말까지 이월 가능. 2년차도 미사용 시 무조건 금전 환산"
        },
        "consent": "이월 시 서면 합의 필수 (노동부 권고)",
        "specialObligation": "사용자는 근로자에게 매년 연차 일수·기간 서면 통지 의무 (§38 V)",
        "tip": "대만은 연차 환산 의무가 가장 엄격. 주재원 포함 전원 적용. 2년 이월은 합의서로 명시 권장"
    },
    "HK": {
        "statutory": "1~2년 7일 / 3년 8일 / 4년 9일 / 5년 10일 / 6년 11일 / 7년 12일 / 8년 13일 / 9년+ 14일 — 고용조례 §41AA",
        "grantRule": "Continuous Contract(4주 18h 이상) 근로자만. 1년 이상 근속 시 발생",
        "compensation": {
            "required": "퇴직 시만",
            "formula": "퇴직 시 미사용분 × 일급 환산 지급 의무 (§41F). 근로 중에는 금전 환산 법적 의무 없음",
            "note": "계약상 추가 연차(beyond 법정)는 계약 규정 따름"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "법적 제한 없음",
            "detail": "계약·사내 규정 자유. 대부분 기업은 12개월 이내 소진 관행"
        },
        "consent": "법정 의무 없음. 계약·핸드북 자유",
        "specialObligation": "연차 7일 이상 중 연속 3일 이상 사용 보장 의무 (§41AA 7일+)",
        "tip": "실무상 Employee Handbook에 이월 한도·환산 방식 명시 필수. 퇴직 시 일급 = 최근 12개월 평균"
    },
    "MO": {
        "statutory": "1년 근속 이상 연 6일 (근속 연수와 무관 일정) — 노동관계법 §44",
        "grantRule": "1년 근속 완료 시 발생. 첫 해 근무 중에는 무급",
        "compensation": {
            "required": True,
            "formula": "사용자 사유 미사용: 일급 × 3배 (기본 1일 휴가 + 2일분 추가). 근로자 자발 미사용은 다음 연도 이월 또는 퇴직 시 환산",
            "note": "Law 7/2008 §46 — 3배 보상은 마카오 특유"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "1년",
            "detail": "당해 연도 미사용분은 다음 연도 3/31까지 사용 가능"
        },
        "consent": "법정 동의서 의무 없음. 사내 규정",
        "specialObligation": "공휴일·주휴일·병가는 연차와 별개 계산",
        "tip": "6일은 근속 무관 고정이라 관리 단순. 사용자 사유 미사용 시 3배 지급 의무 주의"
    },
    "VN": {
        "statutory": "1년 근속 연 12일 (일반) / 14일 (위험·유해) / 16일 (특수 위험) — 노동법 2019 §113. 근속 5년마다 +1일 (§114)",
        "grantRule": "12개월 근속 필수. 미만 근속은 월 비례",
        "compensation": {
            "required": True,
            "formula": "퇴직·해고 시 미사용분 × 일급 환산 지급 의무 (§113 III). 근로 중 환산은 사용자-근로자 합의 시 가능",
            "note": "근속 1년 미만자도 월 비례로 사용 or 환산"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "3개월 (다음 연도 3/31까지)",
            "detail": "법 명시는 없으나 관행상 다음 연도 1분기까지 사용 가능. 이후 자동 환산 또는 소멸"
        },
        "consent": "이월·환산 시 서면 합의 권장 (노동감찰 대비)",
        "specialObligation": "왕복 이동 1일 이상 소요 시 교통일 연차 추가 지급 (§113 VI) — 주재원 귀국 시 활용 가능",
        "tip": "⚠️ 한국인은 장기 주재 시 왕복 이동일 +교통일 추가 적용 가능. 계약서 명시 권장"
    },
    "PH": {
        "statutory": "Service Incentive Leave (SIL) 연 5일 (1년 근속 완료 시) — Labor Code §95",
        "grantRule": "1년 근속 요건. 5인 미만 소규모 사업장·관리직 제외. 단체협약·사내 규정으로 추가 연차(Vacation Leave) 관행",
        "compensation": {
            "required": True,
            "formula": "해당 연도 미사용 SIL은 일급 × 100% 환산 지급 의무. 사용 또는 환산 중 근로자 선택",
            "note": "추가 Vacation Leave는 계약 따름. DOLE D.O. 명확"
        },
        "carryover": {
            "allowed": False,
            "maxYears": "—",
            "detail": "SIL은 당해 연도 소진 또는 환산. 이월 개념 없음"
        },
        "consent": "이월 없음 → 동의서 불필요",
        "specialObligation": "13th Month Pay와는 별개 계산. 주요 해외 주재원은 추가 VL 15~20일 관행",
        "tip": "SIL 5일은 최소 한도. 실무상 국제 표준 맞추려면 계약으로 15~20일 추가 부여"
    },
    "TH": {
        "statutory": "1년 근속 연 6일 (법정 최저) — Labor Protection Act §30",
        "grantRule": "1년 근속 필수. 이후 근속 증가에 따른 가산은 사용자 재량 (관행 10~15일)",
        "compensation": {
            "required": True,
            "formula": "해당 연도 미사용분 × 일급 환산 지급 의무 — LPA §67. 근로자 자발 미사용도 환산 의무",
            "note": "주요 기업은 15~20일 제공 관행"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "1년 (사용자-근로자 합의 시)",
            "detail": "법 명시 없음. 관행상 다음 연도까지 사용 가능"
        },
        "consent": "이월 시 서면 합의 권장",
        "specialObligation": "주재원 관행: 본국 왕복 항공권과 연계된 추가 연차 7~10일 계약 명시 일반",
        "tip": "6일은 너무 적어 실무 관행과 괴리. 20일 전후 부여가 표준"
    },
    "MY": {
        "statutory": "1~2년 8일 / 2~5년 12일 / 5년+ 16일 — Employment Act §60E (2022 개정 후 전 근로자 적용)",
        "grantRule": "12개월 근속 필수. 월 미달 근속은 비례 지급",
        "compensation": {
            "required": "퇴직 시 의무",
            "formula": "퇴직 시 미사용분 × 일급 환산 (§60E(3)). 근로 중 환산은 관행",
            "note": "2022 EA 개정으로 Employment Act 적용 범위 확대 (월급 RM 4,000 이상도 포함)"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "법 명시 없음 (통상 1년)",
            "detail": "계약·사내 규정 자유. Employee Handbook 명시 필요"
        },
        "consent": "법정 동의서 없음",
        "specialObligation": "연차 사용 시 사용자 사전 승인 필요 (§60E(1))",
        "tip": "사내 핸드북에 이월 한도 1년 + 초과분 자동 환산 명시 권장"
    },
    "SG": {
        "statutory": "1년 7일 / 2년 8일 / 3년 9일 / ... / 8년+ 14일 — Employment Act §43",
        "grantRule": "3개월 근속 시부터 비례 발생. 1년 근속 완료 시 전액",
        "compensation": {
            "required": "퇴직 시만",
            "formula": "퇴직 시 미사용분 × 일급 환산 지급 의무. 근로 중 환산은 사용자 재량",
            "note": "추가 연차(beyond 법정)는 KET·계약 규정 따름"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "법 제한 없음 (통상 12개월)",
            "detail": "계약·사내 규정 자유. 대다수 기업 '12개월 이월 후 소멸'"
        },
        "consent": "법정 의무 없음",
        "specialObligation": "1년 미만 근속자도 3개월+ 시 월 비례 지급 발생",
        "tip": "싱가포르는 외국인 비중 높아 이월 정책이 계약 경쟁력 요소. 핸드북 명시 필수"
    },
    "ID": {
        "statutory": "12개월 근속 12일 (매년 리셋) — Cipta Kerja 옴니버스법 §79",
        "grantRule": "12개월 근속 필수. 6년 근속 시 '장기 휴식(istirahat panjang)' 2개월 (일부 기업·단체협약)",
        "compensation": {
            "required": "퇴직 시 의무",
            "formula": "퇴직 시 미사용분 × 일급 환산 (권리대체수당 uang penggantian hak). 근로 중 환산은 법 명시 없음",
            "note": "단체협약(PKB)으로 근로 중 환산 가능하게 규정 가능"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "법 명시 없음 (관행 당해 연도 소진)",
            "detail": "사내 규정·단체협약 자유. 옴니버스법 후 간소화"
        },
        "consent": "법정 의무 없음",
        "specialObligation": "종교 휴일(Idul Fitri 등) 전후 집중 사용 관행 — 사용자 거부 어려움",
        "tip": "THR(13월 급여)와 함께 Idul Fitri 전후 1~2주 연차 사용이 표준 — 스케줄 사전 협의 필수"
    },
    "MN": {
        "statutory": "기본 15일 — 노동법 2021 §95. 근속 가산: 6~10년 +1, 11~15년 +2, 16~20년 +3, 21~25년 +4, 26~30년 +5, 31년+ +6",
        "grantRule": "연간 15일 기본. 특수·위험 직군은 추가 3~18일",
        "compensation": {
            "required": True,
            "formula": "사용자 사유 미사용 시 일급 × 2배 (통상 휴가급 + 추가 급여) 지급 의무",
            "note": "노동법 2021 개정 후 근로자 보호 강화"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "법 명시 없음 (통상 1년)",
            "detail": "관행·사내 규정 자유. 광업 사업장은 교대 근무로 집중 사용 일반"
        },
        "consent": "이월 시 서면 합의 권장",
        "specialObligation": "Naadam(7/11~15) 집중 사용 관행. 광업·원격지 근무는 교대 연차 방식",
        "tip": "원격지 사업장 주재원은 교대 근무로 연 1~2회 장기 연차 사용 관행 — 계약 명시"
    },
    "RU": {
        "statutory": "기본 28일 — 노동법 §115. 극북·위험 직군 추가 (24~52일까지)",
        "grantRule": "6개월 근속 시 전액 발생. 연 2회 분할 사용 가능 (1회 14일 이상)",
        "compensation": {
            "required": "퇴직 시 의무 + 28일 초과분만",
            "formula": "퇴직 시 전 미사용분 × 일급 환산 의무. 근로 중 환산은 28일 초과분만 허용 (§126)",
            "note": "⚠️ 28일 기본 연차는 근로 중 금전 환산 금지 — 건강권 보호"
        },
        "carryover": {
            "allowed": "제한적",
            "maxYears": "1년 (원칙 당해 연도 소진)",
            "detail": "사용자는 근로자가 사용하도록 보장할 의무. 2년 연속 미사용 금지 (§124)"
        },
        "consent": "이월 시 근로자 서면 동의 필수",
        "specialObligation": "⚠️ 2년 연속 미사용 시 노동감독원(GIT) 벌금. 사용자가 사용 시점 '연간 스케줄' 수립 의무",
        "tip": "러시아는 '연차 미사용 = 불법' 원칙 강함. HR이 연차 스케줄 엄격 관리 필수. 주재원도 동일"
    },
    "LA": {
        "statutory": "연 15일 — Labor Law 2013 §49",
        "grantRule": "1년 근속 이상. 1년 미만 비례 지급",
        "compensation": {
            "required": "퇴직 시 관행",
            "formula": "퇴직 시 미사용분 × 일급 환산 (관행). 법 명시 불분명",
            "note": "분쟁 예방 위해 계약서 명시 권장"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "법 명시 없음",
            "detail": "계약·사내 규정 자유"
        },
        "consent": "법정 의무 없음",
        "specialObligation": "Pi Mai(4월) 집중 사용 관행",
        "tip": "15일은 동남아 평균 수준. 주재원은 본국 왕복 교통일 추가 계약 권장"
    },
    "SP": {
        "statutory": "❌ 미 연방법상 법정 연차 없음 (FLSA 적용 안 됨). CNMI 지방법도 없음 — 계약·사내 규정 자유",
        "grantRule": "사용자 재량. 관행 10~15일 (미국 본토 평균 수준)",
        "compensation": {
            "required": False,
            "formula": "법적 의무 없음. 계약·Employee Handbook 따름",
            "note": "일부 주는 퇴직 시 미사용 Vacation 환산을 'wages'로 간주 — 연방은 아님"
        },
        "carryover": {
            "allowed": True,
            "maxYears": "법 제한 없음 (계약 자유)",
            "detail": "사용자 Use-it-or-lose-it 정책도 연방법상 허용"
        },
        "consent": "없음",
        "specialObligation": "미국식 PTO(Paid Time Off) 통합 관행 — 연차·병가·개인 사유 구분 없이 통합",
        "tip": "CNMI 주재원은 본사 퇴직금·연차 유지가 핵심. 현지 계약상 연차는 파견 혜택 플러스 개념"
    }
}


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
        if code not in ANNUAL_LEAVE:
            print(f"[WARN] {code}: no annualLeave data")
            continue
        country["annualLeave"] = ANNUAL_LEAVE[code]
        added += 1

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

    print(f"[DONE] annualLeave 필드 추가: {added}/15개국")


if __name__ == "__main__":
    main()
