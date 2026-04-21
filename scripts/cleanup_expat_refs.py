#!/usr/bin/env python3
"""
현지인 채용 필드에서 주재원/파견/본사 언급 제거.
China 연차 보상 룰 수정 (퇴직 시 법정 최소분만).
Mongolia 기간제 수정 (일반 계약직 1년 허용).
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

# ============================================================
# Non-expat 필드의 주재원 언급 제거 매핑
# key: country code
# value: { field_path: new_value }
# ============================================================

CLEANUP = {
    "JP": {
        "thirteenthMonth.note": "법정 의무 아니나 정사원에겐 사실상 표준. 계약사원·파견직(업체 파견)은 편차 큼"
    },
    "TW": {
        "annualLeave.tip": "대만은 연차 환산 의무가 가장 엄격. 모든 근로자 동일 적용. 2년 이월은 합의서로 명시 권장"
    },
    "VN": {
        "thirteenthMonth.note": "법정 의무 아니나 거의 모든 기업 지급. 미지급 시 노동분쟁·이탈 빈발. 계약서·취업규칙 명시 시 법적 의무화",
        "annualLeave.specialObligation": "왕복 이동 1일 이상 소요 시 교통일 연차 추가 지급 (§113 VI)"
    },
    "PH": {
        "thirteenthMonth.note": "Presidential Decree No. 851 (1975). 외국인 포함 모든 근로자 동일 적용. 미지급 시 DOLE 벌금·형사처벌. 최고 경영진(Managerial)은 제외될 수 있음",
        "annualLeave.specialObligation": "13th Month Pay와는 별개 계산. 외자·대기업은 추가 Vacation Leave 15~20일 관행"
    },
    "TH": {
        "thirteenthMonth.note": "법정 의무 아님. 대기업·외자 기업 대부분 지급. 계약·사규 명시 시 법적 의무",
        "annualLeave.specialObligation": "외자·대기업은 본국 왕복 교통비와 연계된 추가 연차 7~10일을 계약·사규에 명시하는 관행"
    },
    "MY": {
        "thirteenthMonth.note": "법정 의무 아님. 대부분 기업 지급. 계약서·단체협약 명시 시 법적 의무"
    },
    "SG": {
        "thirteenthMonth.note": "법정 의무 아니나 대부분 기업 지급. 계약·단체협약 명시 시 법적 의무. NWC(국가임금위원회) 권고 사항"
    },
    "MN": {
        "thirteenthMonth.note": "법정 의무 아님. 정부·공공부문만 관행 지급. 민간은 실적 연동",
        "annualLeave.tip": "Naadam(7/11~15) 전후 집중 사용 관행. 원격지 광업·인프라 사업장은 교대 근무로 연 1~2회 장기 연차 사용 일반"
    },
    "RU": {
        "annualLeave.tip": "러시아는 '연차 미사용 = 불법' 원칙 강함. HR이 연차 스케줄 엄격 관리 필수. 2년 연속 미사용 시 GIT(노동감독원) 벌금"
    },
    "LA": {
        "thirteenthMonth.note": "법정 의무 아님. 고인플레 대응 연말 특별 보너스 지급 증가",
        "annualLeave.tip": "15일은 동남아 평균 수준. 본국 왕복 교통일은 계약으로 별도 부여 가능"
    },
    "SP": {
        "thirteenthMonth.note": "미국 법에 13th month 개념 없음. 계약·관행으로 연말 보너스 지급 가능(사용자 재량)",
        "annualLeave.tip": "연방법상 법정 연차 없음 → 100% 계약·Employee Handbook으로 설계. PTO(Paid Time Off) 통합 방식이 표준"
    }
}

# ============================================================
# 중국 연차 보상 룰 (법정 최소분 + 퇴직 시만)
# ============================================================

CN_ANNUAL_LEAVE_FIX = {
    "compensation": {
        "required": "퇴직 시 의무 (법정 최소분만)",
        "formula": "퇴직 시 당해 연도 미사용 법정 최소 연차분 × 일급 × 300% 지급 (일급 = 월급 ÷ 21.75). 법정 최소 연차(1~10년 5일 / 10~20년 10일 / 20년+ 15일) 한정, 기업 추가 부여분은 제외",
        "note": "근로 중에는 사용자 사유로 미사용했더라도 '근로자 서면 동의'가 있으면 보상 의무 없음 → 실무상 퇴직 정산 시에만 300% 지급이 표준. 초과 연차(기업 복지성)는 법적 보상 대상 아님. 연차휴가조례(职工带薪年休假条例) 제5조 + 실시방법(实施办法) 제12조"
    }
}

# ============================================================
# 몽골 기간제 (일반 계약직 1년 허용)
# ============================================================

MN_FIXED_TERM_FIX = {
    "max": "일반 계약직 <strong>1년</strong> / 계절·임시·특정 프로젝트 등 특수 사유 시 최대 2년 (노동법 2021 §15)",
    "conversion": "유기 기간 초과 또는 계약서에 유기 명시가 없을 경우 무기 간주",
    "legalBasis": "노동법 2021 제15조",
    "note": "⚠️ <strong>일반 사유(계절·프로젝트 아님) 계약직도 1년까지 가능</strong> — 단 <strong>고용계약서에 '유기계약임'과 '종료일'을 명확히 명시</strong> 필수 (2026 현지 법률자문 확인). 명시 누락 시 자동 무기 간주 리스크. 2년 계약은 계절·프로젝트 등 허용 사유 필요"
}


def deep_set(d: dict, path: str, value):
    """dotted path로 nested dict 값 설정"""
    keys = path.split(".")
    for k in keys[:-1]:
        d = d[k]
    d[keys[-1]] = value


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

    cleanup_count = 0
    for country in data["countries"]:
        code = country["code"]
        if code in CLEANUP:
            for path, new_value in CLEANUP[code].items():
                deep_set(country, path, new_value)
                cleanup_count += 1
                print(f"[CLEAN] {code}.{path}")

        if code == "CN":
            country["annualLeave"]["compensation"] = CN_ANNUAL_LEAVE_FIX["compensation"]
            print("[FIX]  CN annualLeave.compensation")

        if code == "MN":
            country["fixedTermContract"].update(MN_FIXED_TERM_FIX)
            print("[FIX]  MN fixedTermContract")

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

    print(f"\n[DONE] {cleanup_count}건 cleanup + CN·MN 보완")


if __name__ == "__main__":
    main()
