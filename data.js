// ==========================================================
// 제주항공 취항지 노동법·물가·최저임금 대시보드 데이터
// ----------------------------------------------------------
// inflation.rate / inflation.year 는 scripts/update_data.py
// 스크립트가 World Bank API(FP.CPI.TOTL.ZG)에서 자동 갱신.
// minWage 관련 필드는 공식 API 부재로 수동 업데이트.
// GitHub Actions 주기적 실행(scripts/update_data.py) → 커밋.
// ==========================================================
window.DASHBOARD_DATA = {
  "meta": {
    "lastUpdated": "2026-04-11",
    "cpiSource": "World Bank API (FP.CPI.TOTL.ZG)",
    "cpiNote": "World Bank 연간 CPI는 통상 1~2년 lag가 있습니다. 최신 월간 수치는 각국 통계청 링크로 확인하세요.",
    "minWageNote": "최저임금은 공개 API가 없어 수동 업데이트 방식입니다. 각 국가의 minWage.updated 필드에서 최종 갱신일을 확인하세요.",
    "fxSource": "open.er-api.com (클라이언트 사이드 fetch)"
  },
  "countries": [
    {
      "code": "JP",
      "worldBankCode": "JPN",
      "name": "일본",
      "nameEn": "Japan",
      "flag": "🇯🇵",
      "region": "ne",
      "currency": "JPY",
      "minWage": {
        "amount": 1055,
        "unit": "시",
        "display": "¥1,055 / 시",
        "sub": "전국 가중평균",
        "updated": "2024-10-01",
        "trend": {
          "text": "+5.1%",
          "dir": "up",
          "note": "전년 대비"
        }
      },
      "inflation": {
        "rate": 2.74,
        "year": 2024,
        "display": "+2.74%",
        "trend": {
          "text": "상승",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 930
        },
        {
          "year": 2022,
          "value": 961
        },
        {
          "year": 2023,
          "value": 1004
        },
        {
          "year": 2024,
          "value": 1055
        },
        {
          "year": 2025,
          "value": 1118
        }
      ],
      "historyUnit": "¥/시",
      "labor": [
        "법정근로: 주 40시간 / 일 8시간",
        "연장수당: 125% (월 60h 초과 150%)",
        "연차: 6개월 근속 시 10일 발생",
        "노동기준법(労働基準法) 적용"
      ],
      "detailedLabor": {
        "수습기간": "통상 3~6개월 (최저임금 감액 없음)",
        "해고 절차": "30일 전 예고 or 30일분 예고수당, 정당 사유 필요",
        "퇴직금": "법정 의무 아님 (기업 규정·퇴직공제)",
        "사회보험": "건강보험·후생연금·고용보험·노재보험 의무",
        "외국인 고용": "취업비자(기술·인문지식·국제업무 등) 필수"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 125%",
          "note": "월 60시간 초과분은 시급 × 150%"
        },
        "night": {
          "formula": "시급 × 125% (22:00~05:00)",
          "note": "연장과 중복 시 시급 × 150%"
        },
        "restDay": {
          "formula": "시급 × 135%",
          "note": "법정휴일 근무 시 (주휴일 등)"
        },
        "publicHoliday": {
          "formula": "시급 × 135%",
          "note": "휴일 + 야간 중복 시 시급 × 160%"
        }
      },
      "contractRequirements": [
        "계약기간 (유기계약 시 갱신 기준 포함)",
        "근무장소 및 업무내용",
        "근로시간 (시업·종업 시각, 휴게·휴일, 교대제)",
        "임금 결정·계산·지급 방법·지급일",
        "퇴직 관련 사항 (해고 사유 포함)",
        "퇴직수당 (지급 시 조건)",
        "상여·정기수당 (있는 경우)",
        "사회보험 가입 여부"
      ],
      "holidays": [
        {
          "name": "신정",
          "date": "1/1"
        },
        {
          "name": "성인의 날",
          "date": "1월 2째 월"
        },
        {
          "name": "건국기념일",
          "date": "2/11"
        },
        {
          "name": "천황탄생일",
          "date": "2/23"
        },
        {
          "name": "춘분의 날",
          "date": "3/20경"
        },
        {
          "name": "쇼와의 날",
          "date": "4/29"
        },
        {
          "name": "헌법기념일",
          "date": "5/3"
        },
        {
          "name": "어린이의 날",
          "date": "5/5"
        },
        {
          "name": "바다의 날",
          "date": "7월 3째 월"
        },
        {
          "name": "산의 날",
          "date": "8/11"
        },
        {
          "name": "경로의 날",
          "date": "9월 3째 월"
        },
        {
          "name": "문화의 날",
          "date": "11/3"
        },
        {
          "name": "근로감사의 날",
          "date": "11/23"
        }
      ],
      "visa": "한국 여권 <strong>90일 무비자</strong> (단기 관광/상용). 업무 체류는 취업비자(기술·인문지식·국제업무 등) 필요.",
      "fixedTermContract": {
        "max": "3년 (전문직·60세 이상 5년)",
        "conversion": "5년 초과 반복 갱신 시 근로자 청구로 무기계약 전환 (2013~)",
        "legalBasis": "노동계약법 제18조",
        "note": "별도 허가 사유 불필요, 계약 자유 원칙"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "상시 10명 이상",
        "legalBasis": "노동기준법 제89조",
        "procedure": "근로자 대표 의견청취 후 노동기준감독서 신고",
        "note": "임금·근로시간·휴일·해고 등 필수 기재사항"
      },
      "graduateSalary": {
        "display": "¥225,400 / 월",
        "amount": 225400,
        "range": "¥210,000 ~ ¥250,000",
        "source": "후생노동성 임금구조기본통계조사",
        "year": 2024,
        "note": "대졸 남녀 평균 기본급, 상여 제외"
      },
      "sources": [
        {
          "name": "후생노동성",
          "url": "https://www.mhlw.go.jp/"
        },
        {
          "name": "통계국",
          "url": "https://www.stat.go.jp/"
        },
        {
          "name": "최저임금 포털",
          "url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/minimumichiran/"
        }
      ]
    },
    {
      "code": "CN",
      "worldBankCode": "CHN",
      "name": "중국",
      "nameEn": "China",
      "flag": "🇨🇳",
      "region": "ne",
      "currency": "CNY",
      "minWage": {
        "amount": 2690,
        "unit": "월",
        "display": "¥2,690 / 월",
        "sub": "상하이 기준 · 지역별 상이",
        "updated": "2024-07-01",
        "trend": {
          "text": "+5.4%",
          "dir": "up",
          "note": "상하이 조정"
        }
      },
      "inflation": {
        "rate": 0.22,
        "year": 2024,
        "display": "+0.22%",
        "trend": {
          "text": "저물가",
          "dir": "down"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 2590
        },
        {
          "year": 2022,
          "value": 2590
        },
        {
          "year": 2023,
          "value": 2690
        },
        {
          "year": 2024,
          "value": 2690
        },
        {
          "year": 2025,
          "value": 2740
        }
      ],
      "historyUnit": "¥/월 (상하이)",
      "labor": [
        "법정근로: 주 40시간 / 일 8시간",
        "연장수당: 평일 150% / 주말 200% / 공휴일 300%",
        "연차: 1~10년 5일, 10년+ 10~15일",
        "노동계약법(劳动合同法) 적용"
      ],
      "detailedLabor": {
        "수습기간": "3~6개월 (계약기간별), 임금 80% 이상",
        "해고 절차": "30일 전 서면 예고, 경제보상금(N+1) 지급",
        "퇴직금": "경제보상금 = 근속년수 × 월평균임금",
        "사회보험": "양로·의료·실업·산재·생육 5대 + 주택공적금",
        "외국인 고용": "Z비자 + 외국인 취업허가증 필수"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 150%",
          "note": "평일 8h 초과분"
        },
        "night": {
          "formula": "법정 의무 없음",
          "note": "단체협약·기업 규정에 따름"
        },
        "restDay": {
          "formula": "시급 × 200%",
          "note": "주말/휴무일 근무 시 (대체휴무 미지급 시)"
        },
        "publicHoliday": {
          "formula": "시급 × 300%",
          "note": "법정공휴일 근무 (대체휴무 불가)"
        }
      },
      "contractRequirements": [
        "사용자 명칭·주소·법정대표",
        "근로자 성명·주소·신분증번호",
        "계약기간",
        "업무내용 및 근무장소",
        "근로시간 및 휴식·휴가",
        "노동보수 (임금)",
        "사회보험",
        "노동보호·노동조건·직업재해 방호",
        "법령상 필수 기타 사항"
      ],
      "holidays": [
        {
          "name": "원단",
          "date": "1/1"
        },
        {
          "name": "춘절",
          "date": "음력 1/1 (7일)"
        },
        {
          "name": "청명절",
          "date": "4/4~5경"
        },
        {
          "name": "노동절",
          "date": "5/1~3"
        },
        {
          "name": "단오절",
          "date": "음력 5/5"
        },
        {
          "name": "중추절",
          "date": "음력 8/15"
        },
        {
          "name": "국경절",
          "date": "10/1~7"
        }
      ],
      "visa": "한국 여권 <strong>15일 무비자</strong> (2024~ 시범, 관광·상용). 업무 취업은 <strong>Z비자</strong>, 상주는 <strong>R비자</strong> 필요.",
      "fixedTermContract": {
        "max": "명문 상한 없음",
        "conversion": "동일 사용자와 2회 연속 기간제 계약 후 근로자 요구 시 무고정기한(무기) 계약 의무",
        "legalBasis": "노동계약법 제14조",
        "note": "10년 연속 근속자도 무기 전환 청구 가능"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "전 사업장 (인원 기준 없음)",
        "legalBasis": "노동계약법 제4조",
        "procedure": "직공대표대회·전체회의 의견청취 + 공시",
        "note": "규장제도(规章制度) 필수, 미공시 시 효력 제한"
      },
      "graduateSalary": {
        "display": "¥7,500 / 월",
        "amount": 7500,
        "range": "¥6,000 ~ ¥10,000",
        "source": "1급도시(북경·상해·광주·심천) 민간 조사 평균",
        "year": 2024,
        "note": "지역별 편차 매우 큼, 내륙은 ¥4,000~5,500"
      },
      "sources": [
        {
          "name": "인력자원사회보장부",
          "url": "http://www.mohrss.gov.cn/"
        },
        {
          "name": "국가통계국",
          "url": "http://www.stats.gov.cn/"
        }
      ]
    },
    {
      "code": "TW",
      "worldBankCode": null,
      "name": "대만",
      "nameEn": "Taiwan",
      "flag": "🇹🇼",
      "region": "ne",
      "currency": "TWD",
      "minWage": {
        "amount": 28590,
        "unit": "월",
        "display": "NT$28,590 / 월",
        "sub": "시급 NT$190",
        "updated": "2025-01-01",
        "trend": {
          "text": "+4.08%",
          "dir": "up",
          "note": "2025년 인상"
        }
      },
      "inflation": {
        "rate": 2.2,
        "year": 2024,
        "display": "+2.2%",
        "trend": {
          "text": "상승",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 24000
        },
        {
          "year": 2022,
          "value": 25250
        },
        {
          "year": 2023,
          "value": 26400
        },
        {
          "year": 2024,
          "value": 27470
        },
        {
          "year": 2025,
          "value": 28590
        }
      ],
      "historyUnit": "NT$/월",
      "labor": [
        "법정근로: 주 40시간 (2주 변형 가능)",
        "연장수당: 첫 2h 133%, 이후 167%",
        "연차: 6개월 3일부터 시작",
        "노동기준법(勞動基準法) 적용"
      ],
      "detailedLabor": {
        "수습기간": "통상 3개월 이하 (명문 규정 없음)",
        "해고 절차": "10~30일 전 예고, 해고수당 0.5~1개월분/년",
        "퇴직금": "노퇴금(신제 2005~): 6% 개인계좌 적립",
        "사회보험": "노보·건보·취업보험·노퇴금",
        "외국인 고용": "취업허가 + 거류증 필요, 업종 제한"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "첫 2h 시급 × 134%, 이후 2h 시급 × 167%",
          "note": "법정근로시간 외 연장근로"
        },
        "night": {
          "formula": "별도 법정 가산 없음",
          "note": "여성·미성년 야간근로 제한 규정"
        },
        "restDay": {
          "formula": "휴식일 2h 이내 시급 × 134%, 이후 × 167%",
          "note": "주 1회 휴식일(休息日) 근무 시"
        },
        "publicHoliday": {
          "formula": "일급 추가 1일분 × 100% (실질 200%)",
          "note": "국정공휴일(國定假日) 근무"
        }
      },
      "contractRequirements": [
        "근무장소 및 담당업무",
        "근로 시작일·종료일",
        "임금 지급 기준·방법·지급일",
        "근로시간·휴식·휴가·교대",
        "퇴직 관련",
        "직업재해 보상",
        "복리후생",
        "근로자 부담 비용",
        "안전위생",
        "근로자 교육·훈련"
      ],
      "holidays": [
        {
          "name": "원단",
          "date": "1/1"
        },
        {
          "name": "춘절",
          "date": "음력 1/1 (6일)"
        },
        {
          "name": "228 평화기념일",
          "date": "2/28"
        },
        {
          "name": "어린이날",
          "date": "4/4"
        },
        {
          "name": "청명절",
          "date": "4/4~5"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "단오절",
          "date": "음력 5/5"
        },
        {
          "name": "중추절",
          "date": "음력 8/15"
        },
        {
          "name": "국경일",
          "date": "10/10"
        }
      ],
      "visa": "한국 여권 <strong>90일 무비자</strong> (관광/상용). 업무 체류는 취업허가+거류증 필요.",
      "fixedTermContract": {
        "max": "원칙 금지, 특수업무만 허용 (단기·계절성 6개월, 특정성 1년)",
        "conversion": "계속적 업무에 사용 시 자동 무기계약 간주",
        "legalBasis": "노동기준법 제9조",
        "note": "1년 초과 특정성 계약은 노동부 신고 필요"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "상시 30명 이상",
        "legalBasis": "노동기준법 제70조",
        "procedure": "노동부 신고 + 사업장 공시",
        "note": "공작규칙(工作規則), 12개 필수 기재항목"
      },
      "graduateSalary": {
        "display": "NT$33,000 / 월",
        "amount": 33000,
        "range": "NT$30,000 ~ NT$38,000",
        "source": "주계총처 대졸 평균급여 조사",
        "year": 2024,
        "note": "업종별 편차, IT·금융은 NT$40,000+"
      },
      "sources": [
        {
          "name": "노동부",
          "url": "https://www.mol.gov.tw/"
        },
        {
          "name": "주계총처",
          "url": "https://www.stat.gov.tw/"
        }
      ]
    },
    {
      "code": "HK",
      "worldBankCode": "HKG",
      "name": "홍콩",
      "nameEn": "Hong Kong",
      "flag": "🇭🇰",
      "region": "ne",
      "currency": "HKD",
      "minWage": {
        "amount": 42.1,
        "unit": "시",
        "display": "HK$42.1 / 시",
        "sub": "2025.5 개정",
        "updated": "2025-05-01",
        "trend": {
          "text": "+7.1%",
          "dir": "up",
          "note": "2년 주기 조정"
        }
      },
      "inflation": {
        "rate": 1.73,
        "year": 2024,
        "display": "+1.73%",
        "trend": {
          "text": "안정",
          "dir": "flat"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 37.5
        },
        {
          "year": 2022,
          "value": 37.5
        },
        {
          "year": 2023,
          "value": 40.0
        },
        {
          "year": 2024,
          "value": 40.0
        },
        {
          "year": 2025,
          "value": 42.1
        }
      ],
      "historyUnit": "HK$/시",
      "labor": [
        "법정근로시간 별도 없음 (계약 중심)",
        "유급휴일 13일 / 유급연차 7~14일",
        "고용조례(Employment Ordinance) 적용",
        "주 18시간 이상 4주 연속 근무 시 적용"
      ],
      "detailedLabor": {
        "수습기간": "통상 1~3개월, 예고기간 단축",
        "해고 절차": "1개월 예고 or 예고수당, 장기근속금",
        "퇴직금": "장기근속금(5년+) or 해고수당(2년+)",
        "사회보험": "MPF(강제성 공적금) 5%+5%",
        "외국인 고용": "GEP 비자 필요, 월급 기준 상회"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "법정 의무 없음",
          "note": "고용계약·단체협약 중심, 관행적으로 시급 × 100~150%"
        },
        "night": {
          "formula": "법정 의무 없음",
          "note": "계약·업종별 상이"
        },
        "restDay": {
          "formula": "유급 휴식일(1주 1일)",
          "note": "대체휴무 원칙, 법정 가산수당 명문 없음"
        },
        "publicHoliday": {
          "formula": "유급 공휴일(13일/년)",
          "note": "근무 시 대체휴일 48일 내 부여 또는 관행적 가산"
        }
      },
      "contractRequirements": [
        "임금 (율·기간·구성)",
        "근무기간",
        "예고기간",
        "연말 상여금 (있는 경우)",
        "주당 근로시간",
        "유급휴가 조건",
        "병가 조건"
      ],
      "holidays": [
        {
          "name": "원단",
          "date": "1/1"
        },
        {
          "name": "춘절",
          "date": "음력 1/1 (3일)"
        },
        {
          "name": "청명절",
          "date": "4/4~5"
        },
        {
          "name": "부활절",
          "date": "3~4월"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "불탄일",
          "date": "음력 4/8"
        },
        {
          "name": "단오절",
          "date": "음력 5/5"
        },
        {
          "name": "특구성립기념일",
          "date": "7/1"
        },
        {
          "name": "중추절 익일",
          "date": "음력 8/16"
        },
        {
          "name": "국경일",
          "date": "10/1"
        },
        {
          "name": "크리스마스",
          "date": "12/25~26"
        }
      ],
      "visa": "한국 여권 <strong>90일 무비자</strong>. 업무 체류는 GEP(일반고용정책) 비자 필요.",
      "fixedTermContract": {
        "max": "명문 상한 없음 (계약 자유)",
        "conversion": "자동 전환 규정 없음",
        "legalBasis": "고용조례(Employment Ordinance)",
        "note": "4주 연속 18h 이상 = 연속근로(continuous contract) 간주, 각종 보호 적용"
      },
      "workRules": {
        "mandatory": false,
        "threshold": "법정 의무 없음",
        "legalBasis": "-",
        "procedure": "기업별 Employee Handbook 관행",
        "note": "서면 계약서 필수 항목은 존재 (임금·예고기간 등)"
      },
      "graduateSalary": {
        "display": "HK$20,000 / 월",
        "amount": 20000,
        "range": "HK$17,000 ~ HK$25,000",
        "source": "JobsDB 대졸 연봉 조사",
        "year": 2024,
        "note": "금융·전문직은 HK$25,000~35,000"
      },
      "sources": [
        {
          "name": "노동처",
          "url": "https://www.labour.gov.hk/"
        },
        {
          "name": "정부통계처",
          "url": "https://www.censtatd.gov.hk/"
        }
      ]
    },
    {
      "code": "MO",
      "worldBankCode": "MAC",
      "name": "마카오",
      "nameEn": "Macau",
      "flag": "🇲🇴",
      "region": "ne",
      "currency": "MOP",
      "minWage": {
        "amount": 32,
        "unit": "시",
        "display": "MOP 32 / 시",
        "sub": "월 MOP 6,656",
        "updated": "2024-01-01",
        "trend": {
          "text": "+6.7%",
          "dir": "up",
          "note": "2년 주기"
        }
      },
      "inflation": {
        "rate": 0.67,
        "year": 2024,
        "display": "+0.67%",
        "trend": {
          "text": "안정",
          "dir": "flat"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 6240
        },
        {
          "year": 2022,
          "value": 6240
        },
        {
          "year": 2023,
          "value": 6656
        },
        {
          "year": 2024,
          "value": 6656
        },
        {
          "year": 2025,
          "value": 7072
        }
      ],
      "historyUnit": "MOP/월",
      "labor": [
        "법정근로: 주 48시간 / 일 8시간",
        "연장수당: 평일 120% / 휴일 200%",
        "연차: 연 6일 (근속 따라 증가)",
        "노동관계법 제7/2008호 적용"
      ],
      "detailedLabor": {
        "수습기간": "최대 90일 (건설업 180일)",
        "해고 절차": "정당사유 vs 부당해고 차등 보상",
        "퇴직금": "근속년수 × 7일분 월급 (상한 있음)",
        "사회보험": "사회보장기금(FSS) 강제 가입",
        "외국인 고용": "외지고용 허가(藍卡) 필수"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 120%",
          "note": "평일 8h 초과 (일 최대 연장 규제)"
        },
        "night": {
          "formula": "별도 법정 가산 없음",
          "note": "단체협약·업종 관행"
        },
        "restDay": {
          "formula": "시급 × 200% + 대체휴무",
          "note": "주휴일(의무 휴식일) 근무"
        },
        "publicHoliday": {
          "formula": "의무공휴일 시급 × 300%, 일반 × 200%",
          "note": "강제 공휴일 근무 시 3배"
        }
      },
      "contractRequirements": [
        "당사자 신원",
        "근무장소",
        "업무내용",
        "임금 (금액·지급시기·형태)",
        "근로시간·휴식일",
        "계약일자 및 시작일",
        "계약기간 (유기계약인 경우)"
      ],
      "holidays": [
        {
          "name": "원단",
          "date": "1/1"
        },
        {
          "name": "춘절",
          "date": "음력 1/1 (3일)"
        },
        {
          "name": "청명절",
          "date": "4/4~5"
        },
        {
          "name": "부활절",
          "date": "3~4월"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "불탄일",
          "date": "음력 4/8"
        },
        {
          "name": "단오절",
          "date": "음력 5/5"
        },
        {
          "name": "중추절 익일",
          "date": "음력 8/16"
        },
        {
          "name": "국경일",
          "date": "10/1~2"
        },
        {
          "name": "중양절",
          "date": "음력 9/9"
        },
        {
          "name": "추사절",
          "date": "11/2"
        },
        {
          "name": "특구성립기념일",
          "date": "12/20"
        },
        {
          "name": "크리스마스",
          "date": "12/24~25"
        }
      ],
      "visa": "한국 여권 <strong>90일 무비자</strong>. 업무 체류는 노동허가 필요.",
      "fixedTermContract": {
        "max": "2년 (갱신 포함 누적 상한)",
        "conversion": "2년 초과 시 자동 무기계약 전환 / 갱신 최대 2회 / 종료 후 3개월 이내 재계약 시 기존 계약의 갱신으로 간주(근속 승계)",
        "legalBasis": "노동관계법 Law No. 7/2008",
        "note": "⚠️ '3개월 근무 시 자동 정규직'은 오해. 3개월 룰은 '재계약 인정 기간'으로 한도 우회 방지용. 수습기간은 기간제 30일·무기 90일·관리/전문직 180일."
      },
      "workRules": {
        "mandatory": false,
        "threshold": "법정 의무 없음",
        "legalBasis": "-",
        "procedure": "사내 규정 자율",
        "note": "주요 고용조건은 계약서에 명시 필요"
      },
      "graduateSalary": {
        "display": "MOP 16,000 / 월",
        "amount": 16000,
        "range": "MOP 14,000 ~ MOP 20,000",
        "source": "DSEC 취업 통계",
        "year": 2024,
        "note": "카지노·호텔업은 별도 체계"
      },
      "sources": [
        {
          "name": "노공사무국",
          "url": "https://www.dsal.gov.mo/"
        },
        {
          "name": "통계조사국",
          "url": "https://www.dsec.gov.mo/"
        }
      ]
    },
    {
      "code": "VN",
      "worldBankCode": "VNM",
      "name": "베트남",
      "nameEn": "Vietnam",
      "flag": "🇻🇳",
      "region": "se",
      "currency": "VND",
      "minWage": {
        "amount": 4960000,
        "unit": "월",
        "display": "VND 4,960,000 / 월",
        "sub": "지역 I (호치민·하노이 등)",
        "updated": "2024-07-01",
        "trend": {
          "text": "+6.0%",
          "dir": "up",
          "note": "정부 결정"
        }
      },
      "inflation": {
        "rate": 3.62,
        "year": 2024,
        "display": "+3.62%",
        "trend": {
          "text": "상승",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 4420000
        },
        {
          "year": 2022,
          "value": 4680000
        },
        {
          "year": 2023,
          "value": 4680000
        },
        {
          "year": 2024,
          "value": 4960000
        },
        {
          "year": 2025,
          "value": 4960000
        }
      ],
      "historyUnit": "VND/월 (지역 I)",
      "labor": [
        "법정근로: 주 48시간 (단계적 44시간)",
        "연장수당: 평일 150% / 주말 200% / 공휴일 300%",
        "연차: 연 12일 기본",
        "노동법 2019 (No. 45/2019/QH14)"
      ],
      "detailedLabor": {
        "수습기간": "직무별 최대 6/60/30/6일, 임금 85% 이상",
        "해고 절차": "30~45일 예고, 이직수당 0.5개월분/년",
        "퇴직금": "2009년 이후는 실업보험으로 대체",
        "사회보험": "사회·의료·실업 보험 의무",
        "외국인 고용": "노동허가서(Work Permit) 필수"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 150% (평일 연장)",
          "note": "일 최대 연장 및 월/연 한도 있음"
        },
        "night": {
          "formula": "시급 × 130% + 추가 20% (연장 중복 시)",
          "note": "야간(22:00~06:00) 기본급 30% 가산, 야간+연장 = 시급의 (원 연장수당 × 120%)"
        },
        "restDay": {
          "formula": "시급 × 200%",
          "note": "주휴일 근무 시 (정상 일급 별도 지급 아님)"
        },
        "publicHoliday": {
          "formula": "시급 × 300%",
          "note": "법정공휴일/유급연차 근무 시 정상 일급 별도 지급 포함하면 400% 효과"
        }
      },
      "contractRequirements": [
        "사용자 이름·주소·법정대표",
        "근로자 성명·출생일·성별·주소·신분증",
        "업무 및 근무장소",
        "계약기간",
        "임금·지급방식·지급시기",
        "승진·승급 제도",
        "근로시간·휴식시간",
        "보호장비",
        "사회·의료·실업보험",
        "교육·양성·숙련도 향상"
      ],
      "holidays": [
        {
          "name": "양력 신정",
          "date": "1/1"
        },
        {
          "name": "Tet 음력설",
          "date": "음력 1/1 (5일)"
        },
        {
          "name": "흥왕제",
          "date": "음력 3/10"
        },
        {
          "name": "해방기념일",
          "date": "4/30"
        },
        {
          "name": "국제노동절",
          "date": "5/1"
        },
        {
          "name": "건국기념일",
          "date": "9/2 (2일)"
        }
      ],
      "visa": "한국 여권 <strong>45일 무비자</strong> (2023~). 초과 시 e-Visa 90일 가능. 업무는 <strong>LD/DT 비자</strong> 필요.",
      "fixedTermContract": {
        "max": "36개월 (1회 갱신 한정)",
        "conversion": "만료 후 30일 내 재계약 시 두 번째부터 무기계약 간주",
        "legalBasis": "노동법 2019 제20조",
        "note": "60세 이상·외국인은 예외 (반복 기간제 가능)"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "상시 10명 이상",
        "legalBasis": "노동법 2019 제118조",
        "procedure": "노동조합 협의 + 성/시 노동국 등록",
        "note": "내부노동규칙(Nội quy lao động) 작성·등록 의무"
      },
      "graduateSalary": {
        "display": "VND 10,000,000 / 월",
        "amount": 10000000,
        "range": "VND 8,000,000 ~ VND 12,000,000",
        "source": "VietnamWorks 대졸 급여 조사",
        "year": 2024,
        "note": "호치민·하노이 기준, 외국계는 VND 12M~18M"
      },
      "sources": [
        {
          "name": "노동보훈사회부",
          "url": "http://www.molisa.gov.vn/"
        },
        {
          "name": "통계총국 (GSO)",
          "url": "https://www.gso.gov.vn/"
        }
      ]
    },
    {
      "code": "PH",
      "worldBankCode": "PHL",
      "name": "필리핀",
      "nameEn": "Philippines",
      "flag": "🇵🇭",
      "region": "se",
      "currency": "PHP",
      "minWage": {
        "amount": 645,
        "unit": "일",
        "display": "₱645 / 일",
        "sub": "NCR 비농업",
        "updated": "2024-07-17",
        "trend": {
          "text": "+₱35",
          "dir": "up",
          "note": "WO-25"
        }
      },
      "inflation": {
        "rate": 3.21,
        "year": 2024,
        "display": "+3.21%",
        "trend": {
          "text": "상승",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 537
        },
        {
          "year": 2022,
          "value": 570
        },
        {
          "year": 2023,
          "value": 610
        },
        {
          "year": 2024,
          "value": 645
        },
        {
          "year": 2025,
          "value": 645
        }
      ],
      "historyUnit": "₱/일 (NCR)",
      "labor": [
        "법정근로: 주 48시간 / 일 8시간",
        "연장수당: 평일 125% / 주말·휴일 130%",
        "SIL(Service Incentive Leave): 연 5일",
        "Labor Code of the Philippines 적용"
      ],
      "detailedLabor": {
        "수습기간": "6개월 (regular employee 전환 원칙)",
        "해고 절차": "Two-Notice Rule + 정당사유, 부당해고 시 복직",
        "퇴직금": "근속 1년당 0.5~1개월분 (사유별)",
        "사회보험": "SSS·PhilHealth·Pag-IBIG 의무",
        "외국인 고용": "AEP(Alien Employment Permit) + 9(g) 비자"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 125%",
          "note": "평일 8h 초과; 야간(10PM~6AM)과 겹치면 시급 × 137.5%"
        },
        "night": {
          "formula": "시급 × 110%",
          "note": "야간차등(Night Shift Differential) 22:00~06:00, 기본의 10% 가산"
        },
        "restDay": {
          "formula": "일급 × 130% (첫 8h)",
          "note": "주휴일 초과분은 시급 × 169%, 공휴일+주휴일 중복 시 50% 추가"
        },
        "publicHoliday": {
          "formula": "Regular Holiday: 일급 × 200%; Special Non-Working: × 130%",
          "note": "Regular 초과분 260%, Special 초과분 169%"
        }
      },
      "contractRequirements": [
        "당사자 이름 및 주소",
        "직위·업무 설명",
        "임금·수당·혜택",
        "근무시간 및 장소",
        "계약기간 (해당 시)",
        "해지 조건",
        "비밀유지 등 특약",
        "사회보험 가입"
      ],
      "holidays": [
        {
          "name": "신정",
          "date": "1/1"
        },
        {
          "name": "EDSA 혁명기념일",
          "date": "2/25"
        },
        {
          "name": "성주간",
          "date": "3~4월 (부활절 주)"
        },
        {
          "name": "용사의 날",
          "date": "4/9"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "독립기념일",
          "date": "6/12"
        },
        {
          "name": "국가영웅의 날",
          "date": "8월 마지막 월"
        },
        {
          "name": "제신의 날",
          "date": "12/30"
        },
        {
          "name": "크리스마스",
          "date": "12/25"
        }
      ],
      "visa": "한국 여권 <strong>30일 무비자</strong>. 29일 추가 연장 가능. 업무는 9(g) 취업비자 + AEP.",
      "fixedTermContract": {
        "max": "원칙 금지, 프로젝트·계절성만 허용",
        "conversion": "6개월 이상 계속 고용 시 regular(정규직) 간주",
        "legalBasis": "Labor Code Art. 295 (Brent School vs Zamora 판례)",
        "note": "수습기간 6개월 이내, 초과 시 regular 전환"
      },
      "workRules": {
        "mandatory": false,
        "threshold": "법정 의무 기준 없음",
        "legalBasis": "-",
        "procedure": "기업 Code of Conduct·취업규정은 관행",
        "note": "20명 이상 사업장 CBA 관행, DOLE 권고"
      },
      "graduateSalary": {
        "display": "₱22,000 / 월",
        "amount": 22000,
        "range": "₱18,000 ~ ₱28,000",
        "source": "JobStreet / PSA 신입 임금 조사",
        "year": 2024,
        "note": "NCR 민간 기준, BPO·IT는 ₱25,000~35,000"
      },
      "sources": [
        {
          "name": "DOLE 노동부",
          "url": "https://www.dole.gov.ph/"
        },
        {
          "name": "PSA 통계청",
          "url": "https://psa.gov.ph/"
        },
        {
          "name": "최저임금위원회",
          "url": "https://nwpc.dole.gov.ph/"
        }
      ]
    },
    {
      "code": "TH",
      "worldBankCode": "THA",
      "name": "태국",
      "nameEn": "Thailand",
      "flag": "🇹🇭",
      "region": "se",
      "currency": "THB",
      "minWage": {
        "amount": 400,
        "unit": "일",
        "display": "฿400 / 일",
        "sub": "일부 지역·업종",
        "updated": "2024-10-01",
        "trend": {
          "text": "+11.1%",
          "dir": "up",
          "note": "특정 업종·지역"
        }
      },
      "inflation": {
        "rate": 1.37,
        "year": 2024,
        "display": "+1.37%",
        "trend": {
          "text": "안정",
          "dir": "flat"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 336
        },
        {
          "year": 2022,
          "value": 354
        },
        {
          "year": 2023,
          "value": 370
        },
        {
          "year": 2024,
          "value": 400
        },
        {
          "year": 2025,
          "value": 400
        }
      ],
      "historyUnit": "฿/일 (최고치)",
      "labor": [
        "법정근로: 주 48시간 / 일 8시간",
        "연장수당: 평일 150% / 휴일 200~300%",
        "연차: 1년 근속 시 6일",
        "Labor Protection Act B.E. 2541"
      ],
      "detailedLabor": {
        "수습기간": "119일 이하 권장 (120일+ 해고수당 대상)",
        "해고 절차": "사전예고 1기간+, 근속별 해고수당 30~400일분",
        "퇴직금": "근속 120일~ 30일분, 최대 400일분",
        "사회보험": "Social Security Fund (5%+5%)",
        "외국인 고용": "Work Permit + Non-B 비자 필수"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 150%",
          "note": "평일 8h 초과 연장근로"
        },
        "night": {
          "formula": "별도 법정 가산 없음",
          "note": "위험 업무 야간은 내규·단체협약"
        },
        "restDay": {
          "formula": "월급제: 일급 × 100% 추가 (200%); 일급제: 일급 × 200%",
          "note": "주휴일 근무 시 기본 지급액 + 추가분, 8h 초과 시 300%"
        },
        "publicHoliday": {
          "formula": "월급제: 추가 일급 1일분; 일급·시급제: 일급 × 200%",
          "note": "공휴일 근무 시 초과분은 300%"
        }
      },
      "contractRequirements": [
        "사용자·근로자 정보",
        "업무 내용",
        "임금 및 지급방식",
        "근무일·휴일",
        "연장수당·휴일수당 기준",
        "연차·병가",
        "계약기간 (해당 시)",
        "해지 조건·예고기간"
      ],
      "holidays": [
        {
          "name": "신정",
          "date": "1/1"
        },
        {
          "name": "Makha Bucha",
          "date": "음력 3월 보름"
        },
        {
          "name": "차크리 왕조의 날",
          "date": "4/6"
        },
        {
          "name": "송크란",
          "date": "4/13~15"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "대관식의 날",
          "date": "5/4"
        },
        {
          "name": "Visakha Bucha",
          "date": "음력 6월 보름"
        },
        {
          "name": "국왕 탄신일",
          "date": "7/28"
        },
        {
          "name": "모후 탄신일",
          "date": "8/12"
        },
        {
          "name": "푸미폰 기일",
          "date": "10/13"
        },
        {
          "name": "쭐랄롱꼰 대왕의 날",
          "date": "10/23"
        },
        {
          "name": "부친의 날",
          "date": "12/5"
        }
      ],
      "visa": "한국 여권 <strong>60일 무비자</strong> (2024.7 개정). 업무는 Non-B 비자 + Work Permit 필수.",
      "fixedTermContract": {
        "max": "명문 상한 없음 (단 119일 초과 시 해고수당 대상)",
        "conversion": "특별 사유(프로젝트·계절) 없으면 갱신 반복 시 정규직 간주 가능",
        "legalBasis": "Labor Protection Act §118",
        "note": "반복 갱신은 해고수당 누적 리스크"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "상시 10명 이상",
        "legalBasis": "Labor Protection Act §108",
        "procedure": "작성 후 15일 이내 사업장 게시 + 노동부 사본 제출",
        "note": "임금·근로시간·휴가·해고 등 필수 기재"
      },
      "graduateSalary": {
        "display": "฿21,000 / 월",
        "amount": 21000,
        "range": "฿18,000 ~ ฿25,000",
        "source": "NSO / JobsDB 신입 임금",
        "year": 2024,
        "note": "방콕 민간 기준, 외국계는 ฿28,000~40,000"
      },
      "sources": [
        {
          "name": "노동부",
          "url": "https://www.mol.go.th/"
        },
        {
          "name": "NSO 통계청",
          "url": "http://www.nso.go.th/"
        }
      ]
    },
    {
      "code": "MY",
      "worldBankCode": "MYS",
      "name": "말레이시아",
      "nameEn": "Malaysia",
      "flag": "🇲🇾",
      "region": "se",
      "currency": "MYR",
      "minWage": {
        "amount": 1700,
        "unit": "월",
        "display": "RM 1,700 / 월",
        "sub": "5인 이상 사업장",
        "updated": "2025-02-01",
        "trend": {
          "text": "+13.3%",
          "dir": "up",
          "note": "대폭 인상"
        }
      },
      "inflation": {
        "rate": 1.83,
        "year": 2024,
        "display": "+1.83%",
        "trend": {
          "text": "안정",
          "dir": "flat"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 1200
        },
        {
          "year": 2022,
          "value": 1500
        },
        {
          "year": 2023,
          "value": 1500
        },
        {
          "year": 2024,
          "value": 1500
        },
        {
          "year": 2025,
          "value": 1700
        }
      ],
      "historyUnit": "RM/월",
      "labor": [
        "법정근로: 주 45시간 (2022 개정)",
        "연장수당: 평일 150% / 휴일 200%",
        "연차: 근속 2년 미만 8일부터",
        "Employment Act 1955 (2022 개정)"
      ],
      "detailedLabor": {
        "수습기간": "통상 3~6개월 (명시 필요)",
        "해고 절차": "4~8주 예고, 정당사유 입증 책임",
        "퇴직금": "근속 2년+ 해고 시 10~20일분/년",
        "사회보험": "EPF(연금)·SOCSO(산재)·EIS(고용)",
        "외국인 고용": "Employment Pass(EP) or Work Permit"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 150%",
          "note": "평일 법정근로 45h 초과분"
        },
        "night": {
          "formula": "법정 가산 없음",
          "note": "교대수당은 단체협약/사규"
        },
        "restDay": {
          "formula": "반일 이하 1/2일분, 반일 초과 1일분 + 초과분 × 200%",
          "note": "Rest Day 근무 시 (주 1일 의무 휴식일)"
        },
        "publicHoliday": {
          "formula": "일급 × 300% (기본 1일 + 추가 2일분)",
          "note": "공휴일 근무, 8h 초과분은 시급 × 300%"
        }
      },
      "contractRequirements": [
        "당사자 이름",
        "업무 성격·직무",
        "임금율",
        "임금 계산기간·지급일",
        "근로시간",
        "유급·무급 휴일",
        "유급연차",
        "병가 기준",
        "계약 해지 통보기간",
        "수습기간"
      ],
      "holidays": [
        {
          "name": "신정",
          "date": "1/1"
        },
        {
          "name": "Thaipusam",
          "date": "1~2월"
        },
        {
          "name": "춘절",
          "date": "음력 1/1 (2일)"
        },
        {
          "name": "Hari Raya Puasa",
          "date": "이슬람력"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "Wesak Day",
          "date": "4~5월"
        },
        {
          "name": "국왕 생신",
          "date": "6월 1째 월"
        },
        {
          "name": "Hari Raya Haji",
          "date": "이슬람력"
        },
        {
          "name": "Merdeka",
          "date": "8/31"
        },
        {
          "name": "말레이시아의 날",
          "date": "9/16"
        },
        {
          "name": "Deepavali",
          "date": "10~11월"
        },
        {
          "name": "크리스마스",
          "date": "12/25"
        }
      ],
      "visa": "한국 여권 <strong>90일 무비자</strong>. 업무 체류는 EP(Employment Pass) 필수.",
      "fixedTermContract": {
        "max": "명문 상한 없음 (계약 자유)",
        "conversion": "'genuine fixed-term' 요건 엄격, 반복 갱신 시 정규직 간주 가능",
        "legalBasis": "Employment Act 1955",
        "note": "법원 판례(Ahmad Zahri·Innovative Incentives 등)로 우회 금지 경향"
      },
      "workRules": {
        "mandatory": false,
        "threshold": "법정 의무 없음",
        "legalBasis": "-",
        "procedure": "Employment Act 적용자는 고용조건 서면 의무",
        "note": "단체협약 및 사내규정 자율"
      },
      "graduateSalary": {
        "display": "RM 3,200 / 월",
        "amount": 3200,
        "range": "RM 2,800 ~ RM 4,000",
        "source": "MEF Salary Survey",
        "year": 2024,
        "note": "KL 민간, IT·금융은 RM 4,000~5,500"
      },
      "sources": [
        {
          "name": "인적자원부",
          "url": "https://www.mohr.gov.my/"
        },
        {
          "name": "DOSM 통계청",
          "url": "https://www.dosm.gov.my/"
        },
        {
          "name": "JTKSM 노동부",
          "url": "https://jtksm.mohr.gov.my/"
        }
      ]
    },
    {
      "code": "SG",
      "worldBankCode": "SGP",
      "name": "싱가포르",
      "nameEn": "Singapore",
      "flag": "🇸🇬",
      "region": "se",
      "currency": "SGD",
      "minWage": {
        "amount": 0,
        "unit": "월",
        "display": "국가 최저임금 없음",
        "sub": "PWM(직종별 점진임금) 적용",
        "updated": "2025-01-01",
        "trend": {
          "text": "PWM",
          "dir": "flat",
          "note": "청소·경비 등"
        }
      },
      "inflation": {
        "rate": 2.39,
        "year": 2024,
        "display": "+2.39%",
        "trend": {
          "text": "상승",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 1200
        },
        {
          "year": 2022,
          "value": 1400
        },
        {
          "year": 2023,
          "value": 1570
        },
        {
          "year": 2024,
          "value": 1740
        },
        {
          "year": 2025,
          "value": 1870
        }
      ],
      "historyUnit": "S$/월 (PWM 청소직)",
      "labor": [
        "법정근로: 주 44시간 / 일 8~9시간",
        "연장수당: 150% (파트IV 적용 대상)",
        "연차: 근속 1년 7일~",
        "Employment Act (EA) 적용"
      ],
      "detailedLabor": {
        "수습기간": "통상 3~6개월 (법정 규정 없음)",
        "해고 절차": "계약 예고기간 준수, 중대 사유만 즉시해고",
        "퇴직금": "법정 의무 아님 (계약·단체협약)",
        "사회보험": "CPF 20%+17% (시민/PR)",
        "외국인 고용": "EP/SP/WP 등 비자별 월급·쿼터"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 150%",
          "note": "Part IV 적용자: 비육체직 월급 ≤ S$2,600, 육체직 ≤ S$4,500"
        },
        "night": {
          "formula": "법정 의무 없음",
          "note": "교대수당은 계약·단체협약"
        },
        "restDay": {
          "formula": "반일 이하: 일급 1일분 추가 / 반일 초과: 2일분 추가",
          "note": "8h 초과분은 시급 × 150% 추가"
        },
        "publicHoliday": {
          "formula": "일급 추가 1일분 + 대체휴무 또는 일급 지급",
          "note": "공휴일(11일/년) 근무 시"
        }
      },
      "contractRequirements": [
        "고용주 정규명",
        "근로자 정규명",
        "직책 및 업무내용",
        "시작일 및 계약기간",
        "근무시간",
        "휴식일 (주 1일 이상)",
        "유급공휴일",
        "기본임금·지급시기",
        "고정·변동 수당",
        "공제 항목",
        "예고기간",
        "연차·병가·입원휴가",
        "의료혜택",
        "근무지"
      ],
      "holidays": [
        {
          "name": "신정",
          "date": "1/1"
        },
        {
          "name": "춘절",
          "date": "음력 1/1 (2일)"
        },
        {
          "name": "Good Friday",
          "date": "3~4월"
        },
        {
          "name": "Hari Raya Puasa",
          "date": "이슬람력"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "Vesak Day",
          "date": "4~5월"
        },
        {
          "name": "Hari Raya Haji",
          "date": "이슬람력"
        },
        {
          "name": "국경일",
          "date": "8/9"
        },
        {
          "name": "Deepavali",
          "date": "10~11월"
        },
        {
          "name": "크리스마스",
          "date": "12/25"
        }
      ],
      "visa": "한국 여권 <strong>90일 무비자</strong>. 업무 체류는 EP/SP/WP 비자 필요.",
      "fixedTermContract": {
        "max": "명문 상한 없음 (계약 자유)",
        "conversion": "자동 전환 없음, 연속근로(continuous service) 요건만 적용",
        "legalBasis": "Employment Act",
        "note": "일정 기간 연속 시 해고통지·연차 등 권리 발생"
      },
      "workRules": {
        "mandatory": false,
        "threshold": "법정 의무 없음",
        "legalBasis": "-",
        "procedure": "KET(Key Employment Terms) 서면 제공이 대체",
        "note": "14일 이내 14개 항목 KET 서면 제공 의무 (2016~)"
      },
      "graduateSalary": {
        "display": "S$4,300 / 월",
        "amount": 4300,
        "range": "S$3,800 ~ S$5,000",
        "source": "MOM GES 졸업생 취업 조사",
        "year": 2024,
        "note": "NUS/NTU 졸업생 중위값, 금융·테크는 S$5,500~6,500"
      },
      "sources": [
        {
          "name": "MOM 인력부",
          "url": "https://www.mom.gov.sg/"
        },
        {
          "name": "SingStat",
          "url": "https://www.singstat.gov.sg/"
        }
      ]
    },
    {
      "code": "ID",
      "worldBankCode": "IDN",
      "name": "인도네시아",
      "nameEn": "Indonesia",
      "flag": "🇮🇩",
      "region": "se",
      "currency": "IDR",
      "minWage": {
        "amount": 5396761,
        "unit": "월",
        "display": "IDR 5,396,761 / 월",
        "sub": "자카르타 UMP 2025",
        "updated": "2025-01-01",
        "trend": {
          "text": "+6.5%",
          "dir": "up",
          "note": "대통령령"
        }
      },
      "inflation": {
        "rate": 2.18,
        "year": 2024,
        "display": "+2.18%",
        "trend": {
          "text": "상승",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 4416186
        },
        {
          "year": 2022,
          "value": 4641854
        },
        {
          "year": 2023,
          "value": 4901798
        },
        {
          "year": 2024,
          "value": 5067381
        },
        {
          "year": 2025,
          "value": 5396761
        }
      ],
      "historyUnit": "IDR/월 (자카르타)",
      "labor": [
        "법정근로: 주 40시간",
        "연장수당: 1h차 150%, 이후 200%",
        "연차: 1년 근속 시 12일",
        "옴니버스법 (Cipta Kerja) 적용"
      ],
      "detailedLabor": {
        "수습기간": "최대 3개월 (초과 시 정규직 간주)",
        "해고 절차": "옴니버스법 후 단순화, 해고수당 지급",
        "퇴직금": "근속별 해고수당 + 근무기간 보상 + 권리 대체수당",
        "사회보험": "BPJS Kesehatan(의료)·Ketenagakerjaan(고용)",
        "외국인 고용": "RPTKA 승인 + IMTA + KITAS 필수"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "첫 1h 시급 × 150%, 이후 시급 × 200%",
          "note": "시급 = 월급 / 173"
        },
        "night": {
          "formula": "별도 법정 가산 없음",
          "note": "야간·교대수당은 단체협약/사규"
        },
        "restDay": {
          "formula": "6일제: 1~7h 200%, 8h 300%, 9~10h 400%",
          "note": "5일제는 1~8h 200%, 9h 300%, 10~11h 400%"
        },
        "publicHoliday": {
          "formula": "1~7h 시급 × 200%, 8h × 300%, 9~10h × 400%",
          "note": "공휴일 근무 시"
        }
      },
      "contractRequirements": [
        "당사자 이름·주소",
        "업무 내용 및 직위",
        "근무장소",
        "임금 및 지급방식",
        "권리·의무",
        "계약기간 (PKWT: 최대 5년)",
        "계약 서명 장소·날짜",
        "단체협약(PKB) 준거 명시"
      ],
      "holidays": [
        {
          "name": "신정",
          "date": "1/1"
        },
        {
          "name": "Isra Mi'raj",
          "date": "이슬람력"
        },
        {
          "name": "춘절",
          "date": "음력 1/1"
        },
        {
          "name": "Nyepi",
          "date": "사카력 신년"
        },
        {
          "name": "Good Friday",
          "date": "3~4월"
        },
        {
          "name": "Idul Fitri",
          "date": "이슬람력 (2일)"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "Waisak",
          "date": "4~5월"
        },
        {
          "name": "Ascension Day",
          "date": "5~6월"
        },
        {
          "name": "Pancasila의 날",
          "date": "6/1"
        },
        {
          "name": "Idul Adha",
          "date": "이슬람력"
        },
        {
          "name": "독립기념일",
          "date": "8/17"
        },
        {
          "name": "이슬람 신년",
          "date": "이슬람력"
        },
        {
          "name": "Maulid Nabi",
          "date": "이슬람력"
        },
        {
          "name": "크리스마스",
          "date": "12/25"
        }
      ],
      "visa": "한국 여권 <strong>30일 무비자</strong> (관광) 또는 VOA. 업무는 KITAS/KITAP 필요.",
      "fixedTermContract": {
        "max": "5년 (연장 포함 누적)",
        "conversion": "5년 초과 시 PKWTT(무기계약) 전환 의무",
        "legalBasis": "옴니버스법 PP 35/2021",
        "note": "계약 만료 시 보상금(uang kompensasi) 지급 의무 신설"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "상시 10명 이상",
        "legalBasis": "Ketenagakerjaan법 제108조",
        "procedure": "Kemnaker(노동부) 제출·승인",
        "note": "단체협약(PKB) 있으면 취업규칙 면제"
      },
      "graduateSalary": {
        "display": "IDR 6,500,000 / 월",
        "amount": 6500000,
        "range": "IDR 5,500,000 ~ IDR 8,500,000",
        "source": "JobStreet / Kemnaker 조사",
        "year": 2024,
        "note": "자카르타 민간, 외국계·금융은 IDR 10M~15M"
      },
      "sources": [
        {
          "name": "Kemnaker 노동부",
          "url": "https://kemnaker.go.id/"
        },
        {
          "name": "BPS 통계청",
          "url": "https://www.bps.go.id/"
        }
      ]
    },
    {
      "code": "MN",
      "worldBankCode": "MNG",
      "name": "몽골",
      "nameEn": "Mongolia",
      "flag": "🇲🇳",
      "region": "etc",
      "currency": "MNT",
      "minWage": {
        "amount": 660000,
        "unit": "월",
        "display": "MNT 660,000 / 월",
        "sub": "2024.1 개정",
        "updated": "2024-01-01",
        "trend": {
          "text": "+20.0%",
          "dir": "up",
          "note": "대폭 인상"
        }
      },
      "inflation": {
        "rate": 6.2,
        "year": 2024,
        "display": "+6.2%",
        "trend": {
          "text": "고물가",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 420000
        },
        {
          "year": 2022,
          "value": 420000
        },
        {
          "year": 2023,
          "value": 550000
        },
        {
          "year": 2024,
          "value": 660000
        },
        {
          "year": 2025,
          "value": 660000
        }
      ],
      "historyUnit": "MNT/월",
      "labor": [
        "법정근로: 주 40시간",
        "연장수당: 150% 이상",
        "연차: 기본 15일 (근속 가산)",
        "노동법 2021 개정 적용"
      ],
      "detailedLabor": {
        "수습기간": "최대 3개월",
        "해고 절차": "1개월 예고, 해고수당 1개월분 이상",
        "퇴직금": "근속별 해고수당",
        "사회보험": "연금·건강·실업·산재 11.5%+12.5%",
        "외국인 고용": "HG 노동허가 + 외국인 취업세"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 150% 이상",
          "note": "연장근로 (최대 한도 있음)"
        },
        "night": {
          "formula": "시급 × 120% 이상",
          "note": "22:00~06:00, 단체협약으로 추가 가산"
        },
        "restDay": {
          "formula": "시급 × 200% 이상 또는 대체휴무",
          "note": "주휴일(보통 2일) 근무 시"
        },
        "publicHoliday": {
          "formula": "시급 × 200% 이상",
          "note": "법정공휴일 근무 시, 대체휴무 가능"
        }
      },
      "contractRequirements": [
        "업무 성격 및 직무",
        "근무장소",
        "근로시간 및 휴식",
        "임금 및 지급일",
        "계약기간",
        "사회보험",
        "권리·의무",
        "근로조건"
      ],
      "holidays": [
        {
          "name": "신정",
          "date": "1/1"
        },
        {
          "name": "Tsagaan Sar",
          "date": "음력 신년 (3일)"
        },
        {
          "name": "국제여성의 날",
          "date": "3/8"
        },
        {
          "name": "어린이의 날",
          "date": "6/1"
        },
        {
          "name": "Naadam",
          "date": "7/11~15"
        },
        {
          "name": "Chinggis Khaan의 날",
          "date": "11월"
        },
        {
          "name": "독립기념일",
          "date": "12/29"
        }
      ],
      "visa": "한국 여권 <strong>90일 무비자</strong>. 업무 체류는 HG 취업비자 필요.",
      "fixedTermContract": {
        "max": "2년 (일반 업무)",
        "conversion": "계절·임시·특정 프로젝트 등 허용 사유 없으면 무기 전환",
        "legalBasis": "노동법 2021 제15조",
        "note": "특수사유 외 갱신 제한"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "전 사업장 (권장)",
        "legalBasis": "노동법 2021",
        "procedure": "내부 규정 제정·공시",
        "note": "단체협약과 병행 시 우선순위 명문화"
      },
      "graduateSalary": {
        "display": "MNT 2,000,000 / 월",
        "amount": 2000000,
        "range": "MNT 1,500,000 ~ MNT 2,800,000",
        "source": "NSO 평균 급여 통계",
        "year": 2024,
        "note": "울란바토르 민간, 광업·금융은 MNT 3M~5M"
      },
      "sources": [
        {
          "name": "노동사회보장부",
          "url": "https://mlsp.gov.mn/"
        },
        {
          "name": "NSO 통계청",
          "url": "https://www.nso.mn/"
        }
      ]
    },
    {
      "code": "RU",
      "worldBankCode": "RUS",
      "name": "러시아",
      "nameEn": "Russia",
      "flag": "🇷🇺",
      "region": "etc",
      "currency": "RUB",
      "minWage": {
        "amount": 22440,
        "unit": "월",
        "display": "RUB 22,440 / 월",
        "sub": "МРОТ 연방 기준",
        "updated": "2025-01-01",
        "trend": {
          "text": "+16.6%",
          "dir": "up",
          "note": "연방 조정"
        }
      },
      "inflation": {
        "rate": 8.43,
        "year": 2024,
        "display": "+8.43%",
        "trend": {
          "text": "고물가",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 12792
        },
        {
          "year": 2022,
          "value": 15279
        },
        {
          "year": 2023,
          "value": 16242
        },
        {
          "year": 2024,
          "value": 19242
        },
        {
          "year": 2025,
          "value": 22440
        }
      ],
      "historyUnit": "RUB/월",
      "labor": [
        "법정근로: 주 40시간",
        "연장수당: 첫 2h 150%, 이후 200%",
        "연차: 연 28일 (기본)",
        "노동법(Трудовой кодекс РФ) 적용"
      ],
      "detailedLabor": {
        "수습기간": "최대 3개월 (관리직 6개월)",
        "해고 절차": "2개월 전 예고, 해고수당 1~3개월분",
        "퇴직금": "사유별 차등 (구조조정·청산 2~3개월)",
        "사회보험": "통합 사회보험료 30% (고용주 중심)",
        "외국인 고용": "취업허가 + 노동허가(패턴트)"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "첫 2h 시급 × 150%, 이후 시급 × 200%",
          "note": "연장근로 한도: 연 120h, 4개월 내 120h"
        },
        "night": {
          "formula": "시급 × 120% 이상",
          "note": "22:00~06:00, 최소 20% 가산 (단체협약으로 추가)"
        },
        "restDay": {
          "formula": "일급 × 200%",
          "note": "주휴일 근무, 대체휴무 시 정상급여"
        },
        "publicHoliday": {
          "formula": "일급 × 200%",
          "note": "공휴일 근무 시 최소 2배"
        }
      },
      "contractRequirements": [
        "성명 / 명칭",
        "고용주 대표자 정보",
        "계약 체결장소 및 일자",
        "업무기능 (직위·전문분야)",
        "근무장소",
        "업무 시작일",
        "임금 (기본급·수당·보너스)",
        "근로시간·휴식",
        "사회보험 조건",
        "근로조건 특성",
        "수습조건 (해당 시)"
      ],
      "holidays": [
        {
          "name": "신정 연휴",
          "date": "1/1~8"
        },
        {
          "name": "정교 크리스마스",
          "date": "1/7"
        },
        {
          "name": "조국수호자의 날",
          "date": "2/23"
        },
        {
          "name": "국제여성의 날",
          "date": "3/8"
        },
        {
          "name": "봄과 노동의 날",
          "date": "5/1"
        },
        {
          "name": "승전기념일",
          "date": "5/9"
        },
        {
          "name": "러시아의 날",
          "date": "6/12"
        },
        {
          "name": "국민통합의 날",
          "date": "11/4"
        }
      ],
      "visa": "한국 여권 <strong>60일 무비자</strong> (관광, 180일 중 90일 한도). 취업 금지, 업무 시 취업비자 필요.",
      "fixedTermContract": {
        "max": "5년",
        "conversion": "허용 사유 없으면 무기계약 간주",
        "legalBasis": "노동법 제58조·제59조",
        "note": "대체·일시·계절·외국인 등 제한된 사유만 기간제 허용"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "전 사업장",
        "legalBasis": "노동법 제189조",
        "procedure": "근로자 대표 의견청취 + 승인·공시",
        "note": "내부노동규정(Правила внутреннего трудового распорядка) 필수"
      },
      "graduateSalary": {
        "display": "RUB 65,000 / 월",
        "amount": 65000,
        "range": "RUB 50,000 ~ RUB 90,000",
        "source": "HeadHunter / Росстат 신입 조사",
        "year": 2024,
        "note": "모스크바 민간, 지방은 RUB 35,000~50,000"
      },
      "sources": [
        {
          "name": "노동사회보장부",
          "url": "https://mintrud.gov.ru/"
        },
        {
          "name": "Росстат 연방통계청",
          "url": "https://rosstat.gov.ru/"
        }
      ]
    },
    {
      "code": "LA",
      "worldBankCode": "LAO",
      "name": "라오스",
      "nameEn": "Laos",
      "flag": "🇱🇦",
      "region": "se",
      "currency": "LAK",
      "minWage": {
        "amount": 1600000,
        "unit": "월",
        "display": "LAK 1,600,000 / 월",
        "sub": "2023.10 개정",
        "updated": "2023-10-01",
        "trend": {
          "text": "+23.1%",
          "dir": "up",
          "note": "고인플레 대응"
        }
      },
      "inflation": {
        "rate": 23.13,
        "year": 2024,
        "display": "+23.13%",
        "trend": {
          "text": "고물가",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 1100000
        },
        {
          "year": 2022,
          "value": 1200000
        },
        {
          "year": 2023,
          "value": 1600000
        },
        {
          "year": 2024,
          "value": 1600000
        },
        {
          "year": 2025,
          "value": 1600000
        }
      ],
      "historyUnit": "LAK/월",
      "labor": [
        "법정근로: 주 48시간 / 일 8시간",
        "연장수당: 평일 150% / 휴일 200~300%",
        "연차: 연 15일",
        "Labor Law 2013 (2014 시행)"
      ],
      "detailedLabor": {
        "수습기간": "일반 60일, 전문직 30일 이내",
        "해고 절차": "30~45일 예고, 해고수당 지급",
        "퇴직금": "근속 1년당 0.5~1개월분",
        "사회보험": "NSSF(National Social Security Fund)",
        "외국인 고용": "노동허가 + 비자, 쿼터 규제"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "주간 시급 × 150%, 야간 연장 시급 × 200%",
          "note": "평일 8h 초과"
        },
        "night": {
          "formula": "시급 × 115% 이상",
          "note": "야간근로(22:00~05:00) 기본 가산"
        },
        "restDay": {
          "formula": "주간 시급 × 250%, 야간 시급 × 300%",
          "note": "휴일 근무 시"
        },
        "publicHoliday": {
          "formula": "주간 시급 × 250%, 야간 시급 × 300%",
          "note": "공휴일 근무 시 (휴일근무와 동일 체계)"
        }
      },
      "contractRequirements": [
        "당사자 정보",
        "업무 내용",
        "근무장소",
        "임금 및 지급방식",
        "근로시간",
        "계약기간",
        "해지 조건",
        "사회보험"
      ],
      "holidays": [
        {
          "name": "신정",
          "date": "1/1"
        },
        {
          "name": "국제여성의 날",
          "date": "3/8"
        },
        {
          "name": "Lao New Year (Pi Mai)",
          "date": "4/14~16"
        },
        {
          "name": "노동절",
          "date": "5/1"
        },
        {
          "name": "어린이의 날",
          "date": "6/1"
        },
        {
          "name": "Boun Khao Phansa",
          "date": "음력 7~8월"
        },
        {
          "name": "Boun Ok Phansa",
          "date": "음력 10~11월"
        },
        {
          "name": "That Luang 축제",
          "date": "음력 11월"
        },
        {
          "name": "건국기념일",
          "date": "12/2"
        }
      ],
      "visa": "한국 여권 <strong>30일 무비자</strong>. 업무는 비즈니스 비자 + 노동허가.",
      "fixedTermContract": {
        "max": "3년",
        "conversion": "2회 갱신(누적 6년 초과) 후 무기 전환",
        "legalBasis": "Labor Law 2013",
        "note": "기간 초과 시 자동 무기 간주"
      },
      "workRules": {
        "mandatory": true,
        "threshold": "전 사업장",
        "legalBasis": "Labor Law 2013",
        "procedure": "노동사회복지부 등록",
        "note": "내부 규정 제정 및 게시 의무"
      },
      "graduateSalary": {
        "display": "LAK 4,000,000 / 월",
        "amount": 4000000,
        "range": "LAK 3,000,000 ~ LAK 5,500,000",
        "source": "ILO / 현지 구직 플랫폼",
        "year": 2024,
        "note": "비엔티안 민간, 고인플레로 변동 큼"
      },
      "sources": [
        {
          "name": "노동사회복지부",
          "url": "http://www.molsw.gov.la/"
        },
        {
          "name": "LSB 통계청",
          "url": "https://www.lsb.gov.la/"
        }
      ]
    },
    {
      "code": "MP",
      "worldBankCode": "USA",
      "name": "사이판 (CNMI)",
      "nameEn": "Saipan / CNMI",
      "flag": "🇲🇵",
      "region": "etc",
      "currency": "USD",
      "minWage": {
        "amount": 7.25,
        "unit": "시",
        "display": "US$7.25 / 시",
        "sub": "미 연방 최저임금",
        "updated": "2009-07-24",
        "trend": {
          "text": "동결",
          "dir": "flat",
          "note": "연방 기준 유지"
        }
      },
      "inflation": {
        "rate": 2.95,
        "year": 2024,
        "display": "+2.95%",
        "trend": {
          "text": "상승",
          "dir": "up"
        },
        "updated": "2026-04-11"
      },
      "minWageHistory": [
        {
          "year": 2021,
          "value": 7.25
        },
        {
          "year": 2022,
          "value": 7.25
        },
        {
          "year": 2023,
          "value": 7.25
        },
        {
          "year": 2024,
          "value": 7.25
        },
        {
          "year": 2025,
          "value": 7.25
        }
      ],
      "historyUnit": "US$/시",
      "labor": [
        "법정근로: 주 40시간 (FLSA)",
        "연장수당: 150% (40h 초과분)",
        "미 연방법 FLSA + CNMI 지역법 병행",
        "CW-1 외국인 근로자 프로그램 적용"
      ],
      "detailedLabor": {
        "수습기간": "통상 90일 (계약 기준)",
        "해고 절차": "At-will 고용 (계약 없으면 자유 해고)",
        "퇴직금": "법정 의무 아님",
        "사회보험": "Social Security + Medicare + 실업보험",
        "외국인 고용": "CW-1 비자 (CNMI 전용)"
      },
      "wagePremiums": {
        "overtime": {
          "formula": "시급 × 150%",
          "note": "FLSA: 주 40h 초과분"
        },
        "night": {
          "formula": "연방법상 의무 없음",
          "note": "단체협약·사내규정"
        },
        "restDay": {
          "formula": "연방법상 의무 없음",
          "note": "주 40h 초과분만 150%"
        },
        "publicHoliday": {
          "formula": "연방법상 의무 없음",
          "note": "사용자 재량·단체협약"
        }
      },
      "contractRequirements": [
        "직위·업무",
        "임금율",
        "근무시간",
        "혜택 (의료·휴가 등)",
        "고용 조건",
        "해지 사유 (At-will 명시)",
        "CW-1 경우 청원서 조건 준수",
        "연방법·CNMI법 준거"
      ],
      "holidays": [
        {
          "name": "New Year's Day",
          "date": "1/1"
        },
        {
          "name": "MLK Day",
          "date": "1월 3째 월"
        },
        {
          "name": "Commonwealth Day",
          "date": "1/9"
        },
        {
          "name": "Presidents Day",
          "date": "2월 3째 월"
        },
        {
          "name": "Covenant Day",
          "date": "3/24"
        },
        {
          "name": "Memorial Day",
          "date": "5월 마지막 월"
        },
        {
          "name": "Independence Day",
          "date": "7/4"
        },
        {
          "name": "Labor Day",
          "date": "9월 1째 월"
        },
        {
          "name": "Columbus Day",
          "date": "10월 2째 월"
        },
        {
          "name": "Citizenship Day",
          "date": "11/4"
        },
        {
          "name": "Veterans Day",
          "date": "11/11"
        },
        {
          "name": "Thanksgiving",
          "date": "11월 4째 목"
        },
        {
          "name": "Constitution Day",
          "date": "12/8"
        },
        {
          "name": "Christmas",
          "date": "12/25"
        }
      ],
      "visa": "한국 여권 <strong>45일 무비자</strong> (Guam-CNMI VWP). 업무는 CW-1 또는 H-2B 비자 필요.",
      "fixedTermContract": {
        "max": "명문 상한 없음 (at-will 원칙)",
        "conversion": "자동 전환 규정 없음",
        "legalBasis": "미 연방법 / CNMI 지역법",
        "note": "CW-1 비자는 3년 한도(갱신 가능), H-2B는 1년 한도"
      },
      "workRules": {
        "mandatory": false,
        "threshold": "법정 의무 없음",
        "legalBasis": "-",
        "procedure": "Employee Handbook 기업 자율",
        "note": "FLSA·CNMI 노동법 통지(posting) 의무만 존재"
      },
      "graduateSalary": {
        "display": "US$3,000 / 월",
        "amount": 3000,
        "range": "US$2,500 ~ US$3,800",
        "source": "BLS OES / 미국 본토 참고치",
        "year": 2024,
        "note": "CNMI는 데이터 제한적, 본토보다 낮음"
      },
      "sources": [
        {
          "name": "미 노동부 (DOL)",
          "url": "https://www.dol.gov/"
        },
        {
          "name": "BLS 노동통계국",
          "url": "https://www.bls.gov/"
        },
        {
          "name": "CNMI 노동부",
          "url": "https://marianaslabor.net/"
        }
      ]
    }
  ]
};
