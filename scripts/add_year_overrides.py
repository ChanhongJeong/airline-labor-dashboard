#!/usr/bin/env python3
"""
국가별 연도 법률 변경 이력(yearOverrides) 추가.
selectedYear <= overrideYear 인 가장 최신 override를 필드별로 적용.
주요 법률 변경이 있던 국가·연도만 포함.
"""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"

YEAR_OVERRIDES = {
    "KR": {
        # 2019: 주 52시간 300인+ 시행, 관공서 공휴일 유급 미시행
        "2019": {
            "labor": [
                "법정근로: 주 52시간 (<strong>300인+ 시행</strong>, 50인+ 2020.1 예정, 5인+ 2021.7 예정) (근로기준법 §50·§53)",
                "연장수당: 통상임금 × 150% (§56)",
                "연차: 1년 근속 15일, 3년차~ 매 2년 +1일 (최대 25일) (§60)",
                "관공서 공휴일: <strong>유급 의무 아님</strong> (2020~ 300인+ 단계 시행 예정)"
            ],
            "wagePremiums": {
                "overtime": {"formula": "통상임금 × 150%", "note": "평일 법정근로(8h) 초과분. 주 52시간 한도 (300인+ 시행, 50인 미만은 주 68시간까지 가능)"},
                "night": {"formula": "통상임금 × 150% (22:00~06:00)", "note": "야간·연장 중복 시 200%"},
                "restDay": {"formula": "유급 주휴일 근무: 8h 이내 통상임금 × 150%, 8h 초과 × 200%", "note": "주휴수당(8h분)은 별도 지급 원칙"},
                "publicHoliday": {"formula": "관공서 공휴일: <strong>유급 의무 없음</strong> (2020~ 단계 시행 예정)", "note": "300인+ 2020, 30인+ 2021, 5인+ 2022 예정"}
            }
        },
        # 2020: 52시간 300인+ 유지, 관공서 공휴일 300인+ 유급 시행
        "2020": {
            "labor": [
                "법정근로: 주 52시간 (<strong>300인+ 시행</strong>, 50~299인 2021.1 예정, 5~49인 2021.7 예정)",
                "연장수당: 통상임금 × 150% (§56)",
                "연차: 1년 근속 15일, 3년차~ 매 2년 +1일 (최대 25일) (§60)",
                "관공서 공휴일: <strong>300인+ 유급 의무</strong> (2020.1~ 시행, 30인+ 2021 예정)"
            ],
            "wagePremiums": {
                "overtime": {"formula": "통상임금 × 150%", "note": "평일 법정근로(8h) 초과분. 주 52시간 한도 (300인+ 시행)"},
                "night": {"formula": "통상임금 × 150% (22:00~06:00)", "note": "야간·연장 중복 시 200%"},
                "restDay": {"formula": "유급 주휴일 근무: 8h 이내 통상임금 × 150%, 8h 초과 × 200%", "note": "주휴수당(8h분)은 별도 지급 원칙"},
                "publicHoliday": {"formula": "관공서 공휴일 근무: 통상임금 × 150%", "note": "<strong>300인+ 유급 의무</strong> (2020.1~ 시행). 30인 미만은 미적용"}
            }
        },
        # 2022: 5인 이상 전면 시행
        "2022": {
            "labor": [
                "법정근로: 주 52시간 (5인+ 전면 시행) (근로기준법 §50·§53)",
                "연장수당: 통상임금 × 150% (§56)",
                "연차: 1년 근속 15일, 3년차~ 매 2년 +1일 (최대 25일) (§60)",
                "관공서 공휴일: <strong>5인+ 전면 유급 의무</strong> (2022.1~ 시행) + 대체공휴일 포함"
            ],
            "wagePremiums": {
                "overtime": {"formula": "통상임금 × 150%", "note": "평일 법정근로(8h) 초과분. 1주 12시간 한도 (§53). 5인 미만 사업장 연장수당 미적용"},
                "night": {"formula": "통상임금 × 150% (22:00~06:00)", "note": "야간·연장 중복 시 200%. 야간·연장·휴일 3중 시 250%"},
                "restDay": {"formula": "유급 주휴일 근무: 8h 이내 통상임금 × 150%, 8h 초과 × 200%", "note": "주휴수당(8h분)은 별도 지급 원칙. 주휴 근무 = 주휴수당 + 근무수당 + 가산수당"},
                "publicHoliday": {"formula": "관공서 공휴일 근무: 통상임금 × 150% (8h 이내)", "note": "2022~ 5인 이상 사업장 관공서 공휴일 유급 의무화(근로기준법 §55 II). 대체공휴일 포함"}
            }
        }
    },
    "JP": {
        # 2019 이전: 5일 의무 취득 없음, 중소기업 월 60h 25%
        "2019": {
            "annualLeave": {
                "statutory": "근속 6개월 10일 → 1.5년 11일 → ... → 6.5년+ 20일 (최대 20일)",
                "grantRule": "주 5일·풀타임 기준. 파트타임은 비례 지급 (노동기준법 제39조)",
                "compensation": {"required": False, "formula": "원칙 없음. 퇴직 시 미사용분 금전 환산은 사용자 재량", "note": "근로 중 금전 환산은 법적으로 권장 안 됨"},
                "carryover": {"allowed": True, "maxYears": "1년 (소멸시효 2년)", "detail": "당해 연도 미사용분은 다음 연도까지 사용 가능. 2년 후 소멸"},
                "consent": "자동 이월 (별도 동의서 불필요)",
                "specialObligation": "⚠️ <strong>연 5일 이상 취득 의무 2019.4.1 시행</strong> (働き方改革) — 사용자가 시계 지정해서라도 5일 사용시켜야 함",
                "tip": "2019.4부터 5일 의무 취득 제도 시작. 미이행 시 1인당 30만엔 벌금"
            },
            "wagePremiums": {
                "overtime": {"formula": "시급 × 125%", "note": "월 60시간 초과분: <strong>대기업 150%, 중소기업 125%</strong> (중소기업 150% 적용은 2023.4~ 예정)"},
                "night": {"formula": "시급 × 125% (22:00~05:00)", "note": "연장과 중복 시 시급 × 150%"},
                "restDay": {"formula": "시급 × 135%", "note": "법정휴일 근무 시 (주휴일 등)"},
                "publicHoliday": {"formula": "시급 × 135%", "note": "휴일 + 야간 중복 시 시급 × 160%"}
            }
        },
        # 2018 이전: 5일 의무 없음
        "2018": {
            "annualLeave": {
                "statutory": "근속 6개월 10일 → 1.5년 11일 → ... → 6.5년+ 20일 (최대 20일)",
                "grantRule": "주 5일·풀타임 기준. 파트타임은 비례 지급 (노동기준법 제39조)",
                "compensation": {"required": False, "formula": "원칙 없음. 퇴직 시 미사용분 금전 환산은 사용자 재량", "note": "근로 중 금전 환산은 법적으로 권장 안 됨"},
                "carryover": {"allowed": True, "maxYears": "1년 (소멸시효 2년)", "detail": "당해 연도 미사용분은 다음 연도까지 사용 가능. 2년 후 소멸"},
                "consent": "자동 이월 (별도 동의서 불필요)",
                "specialObligation": "연 5일 취득 의무 <strong>미시행</strong> (2019.4~ 시행 예정)",
                "tip": "2019년 이전에는 사용자에게 연차 5일 의무 취득 의무가 없었음"
            },
            "wagePremiums": {
                "overtime": {"formula": "시급 × 125%", "note": "월 60시간 초과분: <strong>대기업 150%, 중소기업 125%</strong>"},
                "night": {"formula": "시급 × 125% (22:00~05:00)", "note": "연장과 중복 시 시급 × 150%"},
                "restDay": {"formula": "시급 × 135%", "note": "법정휴일 근무 시"},
                "publicHoliday": {"formula": "시급 × 135%", "note": "휴일 + 야간 중복 시 시급 × 160%"}
            }
        },
        # 2023: 월 60시간 초과 50% 전 기업 확대
        "2023": {
            "wagePremiums": {
                "overtime": {"formula": "시급 × 125%", "note": "월 60시간 초과분은 150% <strong>(2023.4~ 중소기업 포함 전면 시행)</strong>"},
                "night": {"formula": "시급 × 125% (22:00~05:00)", "note": "연장과 중복 시 시급 × 150%"},
                "restDay": {"formula": "시급 × 135%", "note": "법정휴일 근무 시 (주휴일 등)"},
                "publicHoliday": {"formula": "시급 × 135%", "note": "휴일 + 야간 중복 시 시급 × 160%"}
            }
        }
    },
    "VN": {
        # 2020 이전: 노동법 2012 적용
        "2020": {
            "labor": [
                "법정근로: 주 48시간 (노동법 2012 적용)",
                "연장수당: 평일 150% / 주말 200% / 공휴일 300%",
                "연차: 연 12일 기본",
                "<strong>노동법 2012</strong> 적용 (노동법 2019는 2021.1.1 시행)"
            ],
            "fixedTermContract": {
                "max": "36개월 (1회 갱신 한정) — 노동법 2012",
                "conversion": "만료 후 30일 내 재계약 시 무기계약 간주",
                "legalBasis": "노동법 2012",
                "note": "2021.1.1부터 노동법 2019 시행 예정. 외국인 예외는 동일"
            }
        }
    },
    "ID": {
        # 2020 이전: Manpower Law 13/2003 (옴니버스법 이전)
        "2020": {
            "labor": [
                "법정근로: 주 40시간 (Manpower Law No. 13/2003)",
                "연장수당: 1h차 150%, 이후 200%",
                "연차: 1년 근속 시 12일",
                "<strong>Manpower Law No. 13/2003</strong> 적용 (옴니버스법 Cipta Kerja 2021 시행 전)"
            ],
            "fixedTermContract": {
                "max": "<strong>PKWT 최대 3년</strong> (Manpower Law 13/2003, 옴니버스법 이전)",
                "conversion": "3년 초과 시 PKWTT 전환 의무",
                "legalBasis": "Manpower Law No. 13/2003 제59조",
                "note": "⚠️ 옴니버스법(Cipta Kerja) 2021 시행 후 PKWT 5년으로 확대 + uang kompensasi(보상금) 신설. 이 시점은 Manpower Law 적용"
            },
            "hiringPlaybook": {
                "standardPath": "PKWT(기간제 최대 <strong>3년</strong>) 또는 PKWTT(무기). Manpower Law 13/2003 기준",
                "probationDetails": "⚠️ PKWTT(무기)만 수습 최대 3개월 허용. PKWT(기간제)는 수습 불가 (옴니버스법 이전도 동일)",
                "terminateDuringProbation": "수습 중 양쪽 모두 예고 없이 종료 가능",
                "terminateAfterProbation": "해고 절차 엄격: 노사 협의 → 노동법원(PHI) 결정 필수. 해고수당 근속별 산정",
                "practicalTip": "Manpower Law 시기: PKWT <strong>3년</strong> 한도. 옴니버스법 이후(2021~) 5년으로 확대됨",
                "riskNotes": "Manpower Law 하에서는 해고가 옴니버스법보다 더 엄격. PHI(노동법원) 절차 필수. 2021 이후 간소화"
            }
        }
    },
    "MY": {
        # 2022 이전: EA 1955 개정 전
        "2022": {
            "labor": [
                "법정근로: <strong>주 48시간</strong> (Employment Act 1955 원본)",
                "연장수당: 평일 150% / 휴일 200%",
                "연차: 근속 2년 미만 8일부터",
                "Employment Act 1955 원본 (2022 개정 <strong>미시행</strong>, 2023.1.1 시행 예정)"
            ],
            "wagePremiums": {
                "overtime": {"formula": "시급 × 150%", "note": "평일 법정근로 <strong>48시간</strong> 초과분 (2023~ 45시간으로 단축 예정)"},
                "night": {"formula": "법정 가산 없음", "note": "교대수당은 단체협약/사규"},
                "restDay": {"formula": "반일 이하 1/2일분, 반일 초과 1일분 + 초과분 × 200%", "note": "Rest Day 근무 시"},
                "publicHoliday": {"formula": "일급 × 300% (기본 1일 + 추가 2일분)", "note": "공휴일 근무"}
            },
            "detailedLabor": {
                "수습기간": "통상 3~6개월 (명시 필요)",
                "해고 절차": "4~8주 예고, 정당사유 입증 책임",
                "퇴직금": "근속 2년+ 해고 시 10~20일분/년",
                "사회보험": "EPF(연금)·SOCSO(산재)·EIS(고용)",
                "외국인 고용": "Employment Pass(EP) or Work Permit",
                "EA 적용 범위": "⚠️ <strong>월급 RM 2,000 이하 근로자만</strong> EA 적용 (2023.1.1~ 전 근로자로 확대 예정)"
            }
        }
    },
    "HK": {
        # 2021 이전: 법정 공휴일 12일
        "2021": {
            "detailedLabor": {
                "수습기간": "통상 1~3개월, 예고기간 단축",
                "해고 절차": "1개월 예고 or 예고수당, 장기근속금",
                "퇴직금": "장기근속금(5년+) or 해고수당(2년+)",
                "사회보험": "MPF(강제공적금) 5%+5%",
                "외국인 고용": "GEP 비자 필요, 월급 기준 상회",
                "법정 공휴일": "⚠️ 법정가기(法定假日) <strong>12일</strong> (2022~ 석가탄신일 추가로 13일, 2030까지 17일 확대 예정)"
            }
        }
    },
    "TH": {
        # 2019: 최저임금 325바트 시절
        "2019": {
            "labor": [
                "법정근로: 주 48시간 / 일 8시간",
                "연장수당: 평일 150% / 휴일 200~300%",
                "연차: 1년 근속 시 6일",
                "Labor Protection Act B.E. 2541 (최저임금 ฿325~330/일 수준)"
            ]
        }
    },
    "TW": {
        # 2019 이전: 연차 일수는 2017 개정 후 동일
        "2019": {
            "labor": [
                "법정근로: 주 40시간 (2주 변형 가능)",
                "연장수당: 첫 2h 133%, 이후 167%",
                "연차: 6개월 3일부터 시작 (2017 개정 후 동일)",
                "노동기준법(勞動基準法) 적용"
            ]
        }
    }
}


def main():
    text = DATA_JS.read_text(encoding="utf-8")
    match = re.search(r"window\.DASHBOARD_DATA\s*=\s*(\{.*\})\s*;\s*$", text, re.DOTALL)
    data = json.loads(match.group(1))

    added = 0
    for country in data["countries"]:
        code = country["code"]
        if code in YEAR_OVERRIDES:
            country["yearOverrides"] = YEAR_OVERRIDES[code]
            years = sorted(YEAR_OVERRIDES[code].keys())
            fields = set()
            for y in years:
                fields.update(YEAR_OVERRIDES[code][y].keys())
            print(f"[ADD] {code:4} | {len(years)} snapshots ({', '.join(years)}) | fields: {', '.join(sorted(fields))}")
            added += 1

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

    print(f"\n[DONE] {added}개국 yearOverrides 추가")


if __name__ == "__main__":
    main()
