#!/usr/bin/env python3
"""
중국 외국계 간접고용 구조 보완:
- 대표처(RO/代表处) 직접 고용 금지 → FESCO/CIIC/FASCO 파견 필수
- 파견(劳务派遣) 최소 2년 고정기한 (노동계약법 §58)
- 三性원칙 (临时性·辅助性·替代性) + 10% 한도 (§66)
- 3자 구조: 근로자 ↔ 파견업체 ↔ 사용자 단위
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"


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

    cn = None
    for c in data["countries"]:
        if c["code"] == "CN":
            cn = c
            break
    if not cn:
        raise SystemExit("CN not found")

    # ========================================================
    # 1) fixedTermContract: 파견 2년 최소 룰 추가
    # ========================================================
    cn["fixedTermContract"] = {
        "max": "<strong>직접 고용</strong>: 단일 계약 명문 상한 없음 (1~3년 관행) / <strong>파견 고용(劳务派遣)</strong>: 파견업체-근로자 간 계약 <strong>최소 2년 고정기한 의무</strong> (노동계약법 §58)",
        "conversion": "직접 고용: 동일 사용자와 2회 연속 기간제 후 근로자 요구 시 무고정기한(무기) 전환 의무. 파견 고용: 파견업체와 근로자 간 계약이 전환 대상 (사용자 단위 기준 아님)",
        "legalBasis": "노동계약법 제14조(직접고용) + 제58조(파견 최소 2년) + 제66조(파견 3원칙·10% 한도)",
        "note": "⚠️ <strong>외국계 법인 직접고용 가능 여부</strong>: WFOE(외상독자기업)·JV(중외합자) ✅ 직접 고용 / 대표처(代表处/RO) ❌ 직접 고용 금지 → FESCO·CIIC·FASCO 파견 필수. <strong>파견 고용 4대 규칙</strong>: (1) 파견업체가 근로자와 최소 2년 고정기한 계약 체결 의무 (2) 파견 업무는 '임시성(6개월 이내)·보조성(주업무 보조)·대체성(휴직 등)'의 三性 원칙에 한정 (3) 사용자 단위 전체 근로자의 10% 초과 불가 (4) 동일노동 동일임금 원칙 적용. 10년 연속 근속자 무기 전환 청구도 동일 적용"
    }

    # ========================================================
    # 2) hiringPlaybook: RO vs WFOE 구분 + 파견 실무 설명
    # ========================================================
    cn["hiringPlaybook"] = {
        "standardPath": "⚠️ <strong>법인 형태별 고용 가능 여부 먼저 확인</strong> — <strong>WFOE·JV는 직접 고용 가능</strong>(고정기한 1~3년 → 2회 연속 후 무고정기한, 처음부터 무고정기한도 가능) / <strong>대표처(代表处/RO)는 직접 고용 법적 금지</strong> → FESCO·CIIC·FASCO 등 국가 승인 노무파견업체를 통한 간접 고용(劳务派遣) 필수. RO 자체 채용 인원은 법상 수석대표 포함 4명 제한",
        "probationDetails": "직접 고용 수습기간 (노동계약법 §19): 계약 3개월~1년 → 수습 최대 1개월 / 1~3년 → 수습 최대 2개월 / 3년+ 또는 무고정기한 → 수습 최대 6개월. <strong>파견 근로의 수습은 파견업체가 근로자와 체결한 계약 기준</strong> — 사용자 단위는 별도 수습 부여 불가",
        "terminateDuringProbation": "직접 고용: 수습 중 '임용 기준 미달' 서면 입증 시 해고 가능 (§39). 구체 평가 기준 사전 고지 필수. <strong>파견 근로 수습 종료</strong>는 파견업체가 처리 — 사용자 단위는 파견업체에 '반환(退回)' 요청 (계약상 사유 + 사전 통지 필요)",
        "terminateAfterProbation": "직접 고용: 30일 전 예고 또는 1개월분 임금 + <strong>경제보상금 N+1</strong>(근속년수 × 월평균임금 + 1개월). <strong>파견 근로 종료</strong>: 사용자 단위는 파견업체에 반환만 가능. 반환 사유는 계약 명시(업무 축소·부정행위·부적합 등). 실제 해고는 파견업체가 근로자와 처리하고 경제보상금 부담",
        "practicalTip": "수습 종료 3일 전까지 서면 평가. 모호한 '부적응' 사유는 노동중재 패소 위험. <strong>🏢 RO 운영 시 FESCO/FASCO 서비스 계약이 사실상 고용 관계를 좌우</strong> — 파견 계약서 내 (1) 기본급·상여·수당 구조 (2) 사회보험·주택공적금 처리 (3) 반환(退回) 조건·절차 (4) 서비스 수수료(통상 기본급 15~25%) (5) 분쟁 처리 책임 분담 — 꼼꼼히 협상. 실질 비용 ≈ 기본급 × 1.55~1.70",
        "riskNotes": "⚠️ <strong>파견 구조 주요 위반 리스크</strong>: (1) 三性 원칙 위반 시 '사실상 직접 고용' 판정 → 경제보상금·퇴직금 사용자 단위 부담 (2) 파견 비율 10% 초과 시 노동국 시정 명령 + 벌금 (3) '영속적·주업무' 파견 사용 시 노동중재 패소 판례 다수 (4) 2015 파견 규정 강화 후 '가짜 파견' 단속 대폭 증가. 직접 고용 시 2회 연속 고정기한 후 무고정기한 의무 / 근속 10년+ 근로자 무기 전환 청구권 / 지역별 노동중재 해석 차이"
    }

    # ========================================================
    # 3) detailedLabor: 외국계 간접고용 항목 신규 추가
    # ========================================================
    cn["detailedLabor"]["외국계 고용 구조"] = "⚠️ <strong>대표처(RO)는 직접 고용 법적 금지</strong> → FESCO·CIIC·FASCO 등 승인 파견업체 통한 간접 고용(劳务派遣)만 가능. WFOE·JV는 직접 고용 가능. RO 수석대표 포함 최대 4명 제한"
    cn["detailedLabor"]["파견 고용 규칙"] = "노동계약법 §57-67. 파견업체-근로자 최소 2년 고정기한 의무, 三性(임시·보조·대체) 업무 한정, 사용자 단위 전체 10% 초과 금지, 동일노동 동일임금 원칙. 파견업체가 임금·사회보험·주택공적금·경제보상금 법적 책임 주체"
    cn["detailedLabor"]["주요 파견업체"] = "FESCO(北京外企服务集团·베이징 기반 최대 규모) / CIIC(中智集团·전국 국영) / FASCO(上海外服·상하이) / STA(苏州外服·쑤저우 등 지방). 각 지역별 승인 업체 사용 관행"
    cn["detailedLabor"]["파견 비용 구조"] = "① 기본급 + ② 사회보험 5종(양로·의료·실업·산재·생육, 사용자 부담 약 30%) + ③ 주택공적금(5~12%) + ④ 파견 서비스 수수료(통상 기본급의 15~25%). 실질 '사용자 비용' ≈ 기본급 × 1.55~1.70"

    # ========================================================
    # Write back
    # ========================================================
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

    print("[DONE] China indirect employment structure updated")
    print(f"  - fixedTermContract: {len(cn['fixedTermContract'])} fields")
    print(f"  - hiringPlaybook: {len(cn['hiringPlaybook'])} fields")
    print(f"  - detailedLabor: {len(cn['detailedLabor'])} items (4 new)")


if __name__ == "__main__":
    main()
