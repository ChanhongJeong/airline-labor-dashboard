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
      "hiringPlaybook": {
        "standardPath": "무기계약(正社員) 표준. 유기계약은 契約社員 3년 한도 (전문직·60세+ 5년)",
        "probationDetails": "법정 수습 없음. 관행 試用期間 3~6개월. 본채용 거부는 최초 14일 이내만 즉시 해고 가능",
        "terminateDuringProbation": "14일 이내: 즉시 해고 가능 / 15일+: 30일 예고 또는 30일분 예고수당",
        "terminateAfterProbation": "30일 전 서면 예고 또는 예고수당 + 정당 사유 필수. 부당해고 시 노동심판/법원 절차",
        "practicalTip": "Day 14 이내 평가 완료 권장. 이후엔 사실상 해고 불가 수준. 평가·개선 기회 서면 기록 필수",
        "riskNotes": "해고 규제 세계 최강 수준. '정당 사유' 해석 엄격. 한국식 권고사직도 분쟁 가능"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "건강보험·후생연금·고용보험 의무. 한일 사회보장협정(2005~)으로 5년 이내 파견 시 일본 연금 면제 (적용증명서 필요)",
        "severance": "법정 퇴직금 없음. 기업 퇴직일시금·企業年金 가입자만 수혜. 한국 본사 퇴직금 계속 산정 권장",
        "tax": "183일 이상 = 거주자 세제. 한일 조세조약으로 이중과세 방지",
        "visa": "기술·인문지식·국제업무 비자 필수. 재류카드 14일 이내 발급. 家族滞在 별도"
      },
      "thirteenthMonth": {
        "status": "관행",
        "formula": "기본급 × 1~6개월분 (업계·기업별 편차 큼)",
        "timing": "夏期(6~7월) + 年末(12월) 2회 분할 지급",
        "note": "법정 의무 아니나 정사원에겐 사실상 표준. 계약사원·파견직은 편차 큼. 한국 주재원도 본사 체계 + 현지 관행 확인"
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
      "hiringPlaybook": {
        "standardPath": "고정기한(기간제) 1~3년 → 2회 연속 후 근로자 청구 시 무고정기한. 처음부터 무고정기한도 가능",
        "probationDetails": "기간제 3개월~1년 = 수습 1개월 / 1~3년 = 2개월 / 3년+/무고정 = 6개월",
        "terminateDuringProbation": "수습 중 '임용 기준 미달' 서면 입증 시 해고 가능. 구체 평가 기준 사전 고지 필수",
        "terminateAfterProbation": "30일 전 예고 또는 1개월분 임금 + 경제보상금 N+1 (근속년수 × 월평균임금 + 1개월)",
        "practicalTip": "수습 종료 3일 전까지 서면 평가. 모호한 '부적응' 사유는 노동중재 패소 위험",
        "riskNotes": "2회 연속 고정기한 후 무고정기한 의무. 근속 10년+ 근로자는 무고정기한 청구 가능. 지역별 노동중재 해석 차이"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "외국인 5대 사회보험 원칙 의무. 한중 사회보장협정(2013~)으로 양로·실업은 면제 가능(참가증명서 필요). 의료·산재·생육은 납부",
        "severance": "경제보상금은 외국인 동일 적용. 한국 본사 퇴직금과 중복 여부 사내 규정 사전 확인 필요",
        "tax": "183일 이상 = 거주자세. 5년 초과 체류자는 전 세계 소득 과세 대상. 한중 조세조약 적용",
        "visa": "Z비자 + 외국인 취업허가증(2017~ 통합) 필수. 입국 후 5일 내 취업증 등록, 30일 내 거류증"
      },
      "thirteenthMonth": {
        "status": "관행",
        "formula": "통상 기본급 1~2개월분 (외자기업·국유기업 관행적)",
        "timing": "춘절(음력설) 전 1~2월",
        "note": "법정 의무 아님. 국유기업·공공부문은 '13薪' 고정 관행, 민영은 실적 연동. 계약서·사규 명시 시 법적 의무화"
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
      "hiringPlaybook": {
        "standardPath": "不定期契約(무기) 원칙. 기간제는 계절·단기·특정성 업무만 허용",
        "probationDetails": "법정 수습 없음. 관행 試用期(3개월)은 계약 자유. 계약서 명시 필수",
        "terminateDuringProbation": "판례상 '시용기간' 설정 시 합리 사유로 본채용 거부 가능. 무기 예고와 동일 10일 예고 권장",
        "terminateAfterProbation": "근속별 예고: 3개월~1년 10일 / 1~3년 20일 / 3년+ 30일. 해고수당 월평균 0.5~1개월분/년",
        "practicalTip": "시용 해지도 해고로 간주하는 판례 있음. 평가 근거·개선 기회 문서화 필수",
        "riskNotes": "계속적 업무의 기간제 사용은 자동 무기전환. 유사근로자(準勞工) 보호 강화 추세"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "노보(勞保)·건보(健保)·노퇴금(勞退金) 6% 의무. 한-대만 사회보장협정 없음 → 한국 본사 국민연금·건보 계속 가입 가능",
        "severance": "노퇴금 6% 개인계좌 적립은 외국인 동일. 퇴사 시 일시 환급 청구 가능. 본사 퇴직금과 별도",
        "tax": "183일 미만 = 비거주자 18% 원천징수 / 초과 = 거주자 누진. 한-대만 조세조약 부재(비공식 협력만)",
        "visa": "취업허가(勞動部) + 거류증 필수. 화이트칼라 쿼터 없음"
      },
      "thirteenthMonth": {
        "status": "관행 (사실상 의무 수준)",
        "formula": "年終獎金 = 기본급 × 1~3개월분 (IT·금융 3~6개월)",
        "timing": "춘절(음력설) 전 1~2월",
        "note": "법률 강제 아니나 미지급 시 이직·노동분쟁 빈발. 대부분 기업이 '월급 × 13' 구조로 운영"
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
      "hiringPlaybook": {
        "standardPath": "Continuous Contract(4주 18h+) 기준 보호. 계약 자유 원칙, 기간제·무기 구분 약함",
        "probationDetails": "법정 수습 없음. 관행 1~3개월. 첫 1개월은 예고 불필요가 원칙",
        "terminateDuringProbation": "첫 1개월: 예고 불필요 / 2~3개월 수습 조항 명시 시: 7일 예고 또는 7일분",
        "terminateAfterProbation": "1개월 예고 또는 예고수당. 사유 불필요(단 차별·보복 금지, ERA 보호 조항 적용)",
        "practicalTip": "계약서에 수습기간·예고 명시. 장기근속금(5년+)·해고수당(2년+) 의무 주의",
        "riskNotes": "법정 해고 보호 약하지만 'unreasonable dismissal' 구제(ERA) 가능. Employment Ordinance 제5부 준수"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "MPF 5%+5% 원칙 가입. 단 13개월 미만 단기 체류·해외연금 가입 증명자는 면제 신청 가능. 한국 국민연금 가입 증명 활용",
        "severance": "장기근속금·해고수당 외국인 동일 적용. MPF 면제 시 본사 퇴직금 유지 필수",
        "tax": "저세율(최대 17%). 홍콩 원천소득만 과세. 한-홍콩 조세조약 없음, 사실상 저세율로 이중과세 문제 적음",
        "visa": "GEP(General Employment Policy) 비자 필수. 직군별 최저 월급 기준. 근로 가능 기간은 비자 만료일까지"
      },
      "thirteenthMonth": {
        "status": "계약·관행 명시 시 법적 의무",
        "formula": "계약·사규·관행으로 정해진 경우 'end of year payment' 전액 지급. 근속 3개월+ 비례",
        "timing": "음력설 전 또는 12월",
        "note": "고용조례 제11A~11D조 — 계약·관행으로 규정되면 미지급 시 법 위반. 일방 철회 불가. 실무상 지급 관행이면 법적 권리로 인정"
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
      "hiringPlaybook": {
        "standardPath": "⭐ 무기계약(표준) + 90일 수습. 한국식 '계약직→정규직' 구조 불가",
        "probationDetails": "무기 90일 / 기간제 30일 / 관리·고도전문직 180일. 계약서 명시 필수",
        "terminateDuringProbation": "7일 서면 예고만 필요. 사유 불필요, 해고수당 없음",
        "terminateAfterProbation": "15일 서면 예고 + 해고수당 근속 1년당 7일분 (최대 20년). 정당 사유 없어도 '부당해고 배상' 책임",
        "practicalTip": "⚠️ Day 83까지 종료 결정 서면 통지 완료. Day 90 당일 통지 = 예고 부족 = 부당해고. 평가는 Day 30/60/75 정기 실시",
        "riskNotes": "수습 연장 불가. Day 91 이후는 정식 근로로 자동 전환. 180일 수습은 관리직·고도전문직 한정, 평사원은 90일 고정"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "FSS(사회보장기금) 비거주 외국인 가입 의무(고용주 부담). 한-마카오 사회보장협정 없음",
        "severance": "해고수당(7일분/년) 외국인 동일 적용. 13월 급여도 동일 적용. 본사 퇴직금 유지 권장",
        "tax": "직업세 연간 MOP 144,000 초과분만 과세. 세부담 매우 낮음. 한-마카오 조세조약 없음",
        "visa": "외지고용 허가(藍卡) 필수. 고용주가 DSAL에 신청. 업종별 쿼터 제한(카지노·호텔 등)"
      },
      "thirteenthMonth": {
        "status": "법정 의무",
        "formula": "근속 1년 이상 = 기본급 1개월분 / 1년 미만 = 근무 월수 / 12 × 월급",
        "timing": "12월 (크리스마스 전)",
        "note": "노동관계법(Law 7/2008) 제60조 Christmas Bonus. 중도 퇴사자도 비례 지급 의무. 외국인 동일 적용. 미지급 시 DSAL 벌금"
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
      "hiringPlaybook": {
        "standardPath": "기간제 최대 36개월(1회 갱신) → 2번째 만료 시 자동 무기 전환. 수습은 별도 계약",
        "probationDetails": "직무별: 대학·전문대졸 60일 / 중등 30일 / 단순노무 6일. 수습 임금은 정식 임금의 85% 이상",
        "terminateDuringProbation": "수습 중 양쪽 모두 예고 없이 종료 가능. 서면 결과 통지는 권장(노동분쟁 대비)",
        "terminateAfterProbation": "사용자 해고: 30~45일 예고 + 정당 사유 입증. 일방 해고 시 근속별 해고수당 + 미지급 임금 + 2개월분 배상",
        "practicalTip": "수습 '불합격' 서면 통지를 수습 종료 3일 전 전달. 사유·평가 기록 문서화 필수",
        "riskNotes": "수습 기간 초과 시 자동 정식 근로. 기간제 2회 연속 후 무기 전환. 기간제 갱신 횟수·기간 엄격 관리"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "⚠️ 외국인 사회·의료보험 의무(2018~). **실업보험은 베트남 국민 전용 → 한국인 가입 불가** → 이직수당·퇴직금 대체 불가",
        "severance": "⚠️ 베트남 국민은 실업보험으로 퇴직금 대체되나 **한국인은 실업보험 미가입 → 근속 1년당 0.5개월분 Severance Allowance 별도 지급 의무**. 계약서·사규 명시 필수",
        "tax": "183일 이상 = 거주자 누진세(최대 35%). 한베 조세조약 있음",
        "visa": "노동허가서(Work Permit) 최대 2년, 갱신 가능. 허가 전 근로 금지(최대 VND 75M 벌금 + 출국)"
      },
      "thirteenthMonth": {
        "status": "관행 (사실상 표준)",
        "formula": "Tết 보너스 = 기본급 × 1~3개월분 (평균 1개월분)",
        "timing": "음력설(Tết) 전 1~2월",
        "note": "법정 의무 아니나 거의 모든 기업 지급. 미지급 시 노동분쟁·이탈 빈발. 계약서·취업규칙 명시 시 법적 의무화. 한국 주재원도 동일 지급 관행"
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
      "hiringPlaybook": {
        "standardPath": "Probationary Employment 최대 6개월 → Regular 자동 전환. 기간제는 프로젝트·계절성만",
        "probationDetails": "최대 6개월. 성과 기준·평가 방식을 입사 시 서면 고지 필수 (미고지 시 처음부터 regular 간주)",
        "terminateDuringProbation": "Reasonable standards 미달 시 종료 가능. Two-Notice Rule (1차 고지 + 2차 종료 통지) 적용",
        "terminateAfterProbation": "Just Cause(중대 과실) 또는 Authorized Cause(경영상 필요). Authorized Cause는 해고수당 1개월분/년",
        "practicalTip": "성과 기준 서명본 필수. 6개월 미만이라도 평가 기준 미공지 시 regular 판례. Day 180 전 결정",
        "riskNotes": "Brent School vs Zamora 판례: 사실상 계속 고용은 regular. DOLE 부당해고 시 복직 + 백페이(backwages) 명령"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "SSS·PhilHealth·Pag-IBIG 외국인 가입 의무. 단기 체류(1년 미만) 면제 가능. 한-필 사회보장협정 없음",
        "severance": "Authorized Cause 해고수당 외국인 동일 적용. 13th Month Pay 필수. 본사 퇴직금과 중복 여부 확인",
        "tax": "183일 이상 = 거주자 누진세. 한-필 조세조약 있음",
        "visa": "9(g) 상용 취업비자 + AEP(Alien Employment Permit) 둘 다 필수. 순차 신청 45~60일 소요"
      },
      "thirteenthMonth": {
        "status": "법정 의무",
        "formula": "해당 연도 기본급 합계 ÷ 12 (근속 1개월 이상 전원 대상, 비례 지급)",
        "timing": "매년 12월 24일까지",
        "note": "Presidential Decree No. 851 (1975). 한국 주재원 포함 외국인 동일 적용. 미지급 시 DOLE 벌금·형사처벌. 최고 경영진(Managerial)은 제외될 수 있음"
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
      "hiringPlaybook": {
        "standardPath": "무기계약 원칙. 기간제 119일 룰: 120일 이상 근무 시 해고수당 대상 → 실질적 분기점",
        "probationDetails": "법정 수습 없음. 관행 119일 이하(해고수당 회피 목적). 계약서 명시 권장",
        "terminateDuringProbation": "119일 이내 종료 = 해고수당 없음. 1임금기간(통상 1개월) 예고 또는 예고수당",
        "terminateAfterProbation": "근속 120일~ 해고수당 30일분, 이후 단계별 최대 400일분 누적. 정당 사유 없어도 법정 해고수당 의무",
        "practicalTip": "119일 내 평가 완료. 반복 갱신은 '위장 기간제'로 노동부 분쟁 위험. 근속 연속 계산 주의",
        "riskNotes": "119일 이내 종료도 부당해고(차별·보복 등) 입증 시 별도 손해배상. 근속별 해고수당 누진 가파름"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "Social Security Fund 5%+5% 외국인 가입 의무. 한-태 사회보장협정 없음 → 이중 가입 가능성",
        "severance": "근속별 해고수당(최대 400일분) 외국인 동일 적용. 한국 본사 퇴직금 유지 권장",
        "tax": "183일 이상 = 거주자 누진세. 한-태 조세조약 있음. BOI 프로모션 대상 시 세제 혜택",
        "visa": "Non-B 비자 + Work Permit 필수. Work Permit 전 근로 금지(형사처벌·벌금)"
      },
      "thirteenthMonth": {
        "status": "관행",
        "formula": "기본급 1개월분 (대기업·외자 기업 표준)",
        "timing": "연말(12월) 또는 송크란(4월)",
        "note": "법정 의무 아님. 대기업·외자 기업 대부분 지급. 계약·사규 명시 시 법적 의무. 한국 주재원 포함 동일 관행"
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
      "hiringPlaybook": {
        "standardPath": "Permanent 원칙. Fixed-term은 'genuine need' 입증 필요, 반복 갱신 시 regular 간주 판례",
        "probationDetails": "법정 규정 없음. 관행 3~6개월. 계약서 명시 필수",
        "terminateDuringProbation": "수습 중 해고도 '합리 사유' 판례 요구. 서면 고지 + Two-notice 권장",
        "terminateAfterProbation": "Employment Act 적용자 해고수당: 2~5년 10일/년, 5~10년 15일/년, 10년+ 20일/년. 4~8주 예고",
        "practicalTip": "Industrial Court 부당해고 판정 시 복직 명령 + 백페이. 평가·개선 기회 기록 철저",
        "riskNotes": "Ahmad Zahri 판례 등 sham fixed-term 판정 증가. 반복 갱신 금지 원칙 강화"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "EPF 외국인 선택 가입(의무 아님). SOCSO 2019~ 외국인 의무. EIS(고용보험) 외국인 면제",
        "severance": "Employment Act 해고수당 외국인 동일 적용. EPF 미가입 시 본사 퇴직금 유지 권장",
        "tax": "183일 이상 = 거주자 누진세. 미만 = 비거주자 30% 일괄. 한-말 조세조약 있음",
        "visa": "Employment Pass(EP) 필수. 최저 월급 RM 5,000+. 카테고리별 기간 상이 (Cat I 5년, II 2년, III 1년)"
      },
      "thirteenthMonth": {
        "status": "관행",
        "formula": "기본급 × 1~2개월분 (계약·사규 상이)",
        "timing": "연말 또는 Hari Raya 전",
        "note": "법정 의무 아님. 대부분 기업 지급. 계약서·단체협약 명시 시 법적 의무. 한국 주재원 포함 동일 관행"
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
      "hiringPlaybook": {
        "standardPath": "Permanent + 수습 관행 3~6개월. 계약 자유 원칙. KET 14개 항목 서면 14일 이내 의무",
        "probationDetails": "법정 수습 없음. 관행 3~6개월. 계약서·KET에 명시",
        "terminateDuringProbation": "계약 예고기간 준수 (통상 1일~1주). 사유 불필요",
        "terminateAfterProbation": "계약 예고기간 (1~3개월). 중대 사유 시 즉시 해고 가능. 법정 해고수당 없음",
        "practicalTip": "성과 해고는 문서화 필수. Fair Consideration Framework(FCF) 준수. TADM(노동분쟁조정) 대응 가능",
        "riskNotes": "부당해고 소송 드물지만 MOM 분쟁 가능. Tripartite Alliance Fair Employment Practices 준수 필수"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "⚠️ CPF는 시민·PR 전용 → **외국인(Work Pass) CPF 미가입** → 고용주 부담 크게 감소. 한국 본사 국민연금 계속 가입",
        "severance": "법정 해고수당 없음 → **본사 퇴직금 유지 필수**. 계약서에 퇴직금 조항 명시 가능",
        "tax": "183일 이상 = 거주자(최대 24%) / 미만 = 비거주자(15% 또는 최종세율). 한-싱 조세조약 있음",
        "visa": "EP(Employment Pass) 최저 월급 S$5,600+(2025~). 또는 SP(S$3,150)/WP. EP 갱신 2년 단위. COMPASS 점수제"
      },
      "thirteenthMonth": {
        "status": "관행 (AWS - Annual Wage Supplement)",
        "formula": "통상 기본급 × 1개월분 (일부 기업 2개월분)",
        "timing": "12월 또는 춘절 전",
        "note": "법정 의무 아니나 대부분 기업 지급. 계약·단체협약 명시 시 법적 의무. NWC(국가임금위원회) 권고 사항. 한국 주재원 포함 동일"
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
      "hiringPlaybook": {
        "standardPath": "PKWT(기간제 최대 5년) 또는 PKWTT(무기). PKWT 만료 시 보상금 지급 의무",
        "probationDetails": "⚠️ PKWTT(무기)만 수습 최대 3개월 허용. PKWT(기간제)는 수습 불가",
        "terminateDuringProbation": "수습 중 양쪽 모두 예고 없이 종료 가능. 서면 결과 통지 권장",
        "terminateAfterProbation": "옴니버스법 후 간소화. 근속별 해고수당(uang pesangon) + 근무기간보상(uang penghargaan) + 권리대체수당(uang penggantian hak)",
        "practicalTip": "PKWT 5년 초과 시 자동 PKWTT 전환. PKWT 만료 시 근무월당 1/12 × 월급 보상금 지급",
        "riskNotes": "기간제 채용 시 수습 조항 무효. 노동법원 부당해고 판례 다수. 해고 사유 서면 입증 필수"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "BPJS Kesehatan(의료)·Ketenagakerjaan(고용) 외국인 6개월 이상 근무 시 가입 의무. 한-인니 사회보장협정 없음",
        "severance": "해고수당 외국인 동일 적용. THR(13월 급여) 외국인 동일 의무. 본사 퇴직금 중복 방지 사내 협의 필요",
        "tax": "183일 이상 = 거주자 누진세(최대 35%). 한-인니 조세조약 있음",
        "visa": "RPTKA(외국인고용계획) + IMTA + KITAS 3단 절차. 특정 직군(HR, 법무 등) 금지 리스트. 절차 2~3개월"
      },
      "thirteenthMonth": {
        "status": "법정 의무 (THR - Tunjangan Hari Raya)",
        "formula": "근속 1년 이상 = 기본급 1개월분 / 1개월~1년 미만 = 비례(근속월/12 × 월급)",
        "timing": "종교 휴일(Idul Fitri/Natal/Nyepi 등) 7일 전",
        "note": "Kepmenaker No. 6/2016. 미지급 시 5% 연체료 + Kemnaker 제재. 외국인(한국인 포함) 동일 적용. 가장 엄격한 13월 급여 법제 중 하나"
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
      "hiringPlaybook": {
        "standardPath": "무기계약 원칙. 기간제는 계절·임시·특정 프로젝트 등 허용 사유 시만",
        "probationDetails": "최대 3개월 수습. 계약서 명시 필수",
        "terminateDuringProbation": "수습 중 사유 입증 시 해고 가능. 예고 없이 종료 가능하나 서면 사유 기록 권장",
        "terminateAfterProbation": "1개월 예고 + 해고수당 월급 1개월분 이상. 근속별 가산",
        "practicalTip": "수습 평가 문서화. 구두 평가·사유 무효 판례 존재. 노동법 2021 개정 후 근로자 보호 강화",
        "riskNotes": "허용 사유 없는 기간제는 자동 무기 간주. 외국인 쿼터·취업세 부담"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "사회보험 외국인 선택 가입(단체협약 기반). 의무 아님. 한-몽 사회보장협정 없음",
        "severance": "해고수당 외국인 동일 적용. 본사 퇴직금 유지 권장",
        "tax": "183일 이상 = 거주자 누진세. 한-몽 조세조약 있음",
        "visa": "HG(취업비자) 필수. 외국인 취업세 고용주 부담 (월 최저임금의 2배). 쿼터 제한 엄격(업종별 5~10%)"
      },
      "thirteenthMonth": {
        "status": "관행",
        "formula": "1~2개월분 (대기업·광업 관행)",
        "timing": "연말 또는 Tsagaan Sar(음력 신년) 전",
        "note": "법정 의무 아님. 정부·공공부문만 관행 지급. 민간은 실적 연동. 주재원은 본사 체계 + 현지 관행 확인"
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
      "hiringPlaybook": {
        "standardPath": "무기계약 원칙. 기간제 5년 한도이나 허용 사유 엄격 제한 (대체·일시·계절·외국인 등)",
        "probationDetails": "일반직 최대 3개월 / 관리직·경리 최대 6개월 / 2~6개월 단기 계약 최대 2주",
        "terminateDuringProbation": "수습 해고 = 3일 전 서면 예고 + 불합격 사유 구체 명시. 해고수당 없음",
        "terminateAfterProbation": "2개월 전 예고 + 해고수당 월평균 1~3개월분 (사유별). 구조조정은 3개월분",
        "practicalTip": "수습 해고 사유는 구체·측정 가능하게 문서화. 러시아 법원 '주관적 평가' 사유 부정 판례 다수",
        "riskNotes": "기간제 사유 엄격. 사유 없이 반복 시 무기 간주. 노동감독원(GIT) 조사·벌금"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "외국인도 연금·의료·산재 가입 의무. 한-러 사회보장협정(2021~)으로 연금 이중납부 회피 가능 (적용증명서 필요)",
        "severance": "해고수당 외국인 동일 적용. 본사 퇴직금 유지 권장",
        "tax": "⚠️ 183일 이상 = 거주자 13%(고액 15%) / 미만 = 비거주자 30% 중과세. 한-러 조세조약 활용 필수",
        "visa": "노동허가(WP) 또는 HQS(고급 전문가 - 월 167,000 RUB+) 비자. HQS는 간소 절차·세제 우대. 지역별 쿼터"
      },
      "thirteenthMonth": {
        "status": "관행",
        "formula": "13я зарплата = 기본급 × 1개월분 (단체협약·사규 명시 시)",
        "timing": "12월",
        "note": "법정 의무 아님. 단체협약·사규 명시 시 법적 의무. 사기업 지급률 감소 추세이나 대기업·외자 기업 관행 유지"
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
      "hiringPlaybook": {
        "standardPath": "무기 원칙. 기간제 최대 3년, 2회 갱신(누적 6년) 후 자동 무기 전환",
        "probationDetails": "일반직 60일 / 전문직 30일. 계약서 명시 필수",
        "terminateDuringProbation": "수습 중 해고 예고 단축 (통상 무예고 또는 수일). 서면 사유 명시 필수",
        "terminateAfterProbation": "30~45일 예고 + 해고수당 근속 1년당 0.5~1개월분 (사유별)",
        "practicalTip": "수습 평가 문서화. 노동부 분쟁 시 계약서·평가 기록 중심 판단",
        "riskNotes": "기간제 6년 초과 시 자동 무기. 외국인 쿼터(일반적 10% 이내) 엄격"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "NSSF(사회보장기금) 외국인 가입 원칙 의무. 단 한국 본사 소속 증명(파견 형식) 시 면제 신청 가능. 한-라오스 협정 없음",
        "severance": "해고수당 외국인 동일 적용. 본사 퇴직금 유지 권장",
        "tax": "183일 이상 = 거주자 누진세. 한-라오스 조세조약 있음",
        "visa": "비즈니스 비자 + 노동허가 필수. 외국인 쿼터 제한. 서류 절차 느림(3~6개월 가능)"
      },
      "thirteenthMonth": {
        "status": "관행",
        "formula": "기본급 × 1개월분 (대기업·외자 기업)",
        "timing": "라오스 신년(Pi Mai, 4월) 전 또는 연말",
        "note": "법정 의무 아님. 고인플레 대응 연말 특별 보너스 지급 증가. 주재원은 본사 체계 우선 + 현지 관행 보완"
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
      "hiringPlaybook": {
        "standardPath": "At-will 고용 원칙. 계약 자유. CW-1 비자 근로자는 청원서 조건(직무·임금) 준수",
        "probationDetails": "법정 수습 없음. 관행 90일. 계약서 자유 명시",
        "terminateDuringProbation": "사유·예고 불필요 (at-will). 단 차별·보복 해고는 연방법(Title VII 등) 위반",
        "terminateAfterProbation": "사유·예고 불필요 (at-will). 법정 해고수당 없음. 단 차별·WARN Act(집단해고) 등 주의",
        "practicalTip": "해고 시 문서화는 법적 분쟁(차별 등) 대비용. 청원서 조건 변경 시 USCIS 신고",
        "riskNotes": "CW-1 비자 3년 내 갱신 필요. 청원서 조건 이탈 시 비자 취소. 2029까지 CW-1 프로그램 연장 승인"
      },
      "koreanWorkerNotes": {
        "applicable": true,
        "socialInsurance": "Social Security + Medicare 의무. 한-미 사회보장협정으로 5년 이내 파견 시 한국만 납부(Certificate of Coverage A/USA 4 필요)",
        "severance": "법정 해고수당 없음 → **본사 퇴직금 유지 필수**",
        "tax": "미 연방세 + CNMI 지방세. 183일 기준 거주자 판정. 한-미 조세조약 있음. Federal FICA 세금 주의",
        "visa": "CW-1 비자 (CNMI 전용, 3년 갱신) 또는 H-2B(1년). I-129CW 청원서 필수. 최저 임금 준수"
      },
      "thirteenthMonth": {
        "status": "없음",
        "formula": "-",
        "timing": "-",
        "note": "미국 법에 13th month 개념 없음. 계약·관행으로 연말 보너스 지급 가능(사용자 재량). 본사 정책 우선 적용"
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
