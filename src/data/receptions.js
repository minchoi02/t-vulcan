// Mock data shaped like the T-VULCAN offline reception ledger.
// Values are illustrative placeholders, not real customer records.

export const STATUS_TABS = [
  { key: 'all', label: '접수건' },
  { key: 'bpart', label: 'B파트' },
  { key: 'insurance', label: '보험건' },
  { key: 'general', label: '일반건' },
  { key: 'settled', label: '결제완료건' },
  { key: 'hyundai', label: '현대개피탈' },
  { key: 'redcap', label: '레드캡' },
  { key: 'openlink', label: '오픈링크' },
  { key: 'openlink-kb', label: '오픈링크-KB캐피탈' },
  { key: 'unsettled', label: '미종결' },
  { key: 'closed', label: '종결' },
  { key: 'whole', label: '전체' },
  { key: 'deleted', label: '삭제건' },
  { key: 'cash-card', label: '현금/카드' },
  { key: 'split', label: '부활건' },
  { key: 'return', label: '반품건' },
  { key: 'disposed', label: '폐기건' }
]

export const NAV_ITEMS = ['유선접수', '견적서', 'T-벌컨(VULCAN)', '잔존물회수의뢰', '티벌컨 물품제고관리', '물품접수', '기술자문', '파워트레인']

export const PROGRESS_OPTIONS = ['선택', '픽업예정', '수리중', '수리완료', '배송중']
export const BILLING_OPTIONS = ['선택', '대기', '상신', '승인', '반려']

const partners = ['W안산지사(리얼휠)', 'W인천지사(휠119)', 'A용인지사', 'A대전본사, T블랙서클', '']
const insurers = ['삼성화재해상보험', 'DB손해보험', '현대해상화재보험', 'KB손해보험', '전국화물공제조합']
const sources = ['(주)디에이지 오토모빌-서울', '(주)한강자동차-김포', '카프라이즈-안양', '새천년자동차공업사-용인', '현대신성모터스(주)-인천', '대신자동차-부천', '현대통합서비스(화성)']
const managers = ['문기훈', '장호만', '김동근', '석준호', '고진원', '현대신성모터스', '박재원']
const models = ['스포티지', '투싼', '싼타페', '티볼리', '팰리세이드', 'K7', 'K9', '벤츠 E300', '쏘렌토', '그랜저', '스팅어']
const requestTypes = ['휠-수리', '타이어+휠수리', '타이어-주문']
const carriers = ['김노아', '유진희']
const progress = ['픽업예정', '수리완료', '수리중', '배송중', '선택']
const billing = ['상신', '선택', '대기', '승인']

function plate(i) {
  const region = ['12가', '34나', '45라', '66구', '25우', '46수', '39소', '115고', '238보', '179노', '04누', '354두'][i % 12]
  const num = 1000 + i * 137
  return `${region}${num}`
}

export const receptions = Array.from({ length: 42 }).map((_, idx) => {
  const i = 42 - idx
  const isPhoneIn = i % 11 === 0
  return {
    no: 367 - idx,
    receiptNo: `${isPhoneIn ? 'A' : i % 7 === 0 ? 'Q' : 'V'}2026090${600 + idx}`,
    source: sources[idx % sources.length],
    customer: idx % 4 === 0 ? sources[(idx + 2) % sources.length] : insurers[idx % insurers.length],
    manager: managers[idx % managers.length],
    plate: plate(idx),
    model: models[idx % models.length],
    requestType: isPhoneIn ? '타이어+휠수리' : requestTypes[idx % requestTypes.length],
    requestDate: `26-09-${String(Math.max(1, 8 - Math.floor(idx / 6))).padStart(2, '0')}`,
    partner: isPhoneIn ? '' : partners[idx % partners.length],
    carrier: carriers[idx % carriers.length],
    progress: isPhoneIn ? '선택' : progress[idx % progress.length],
    billing: isPhoneIn ? '선택' : billing[idx % billing.length],
    monthlyAmount: isPhoneIn ? null : 120000 + (idx % 9) * 34500
  }
})

export const BUSINESS_UNITS = ['사업부전체', '대전본사', '수도권1지사', '수도권2지사', '영남지사', '호남지사']
export const PARTNER_FILTERS = ['협력업체전체', ...Array.from(new Set(partners.filter(Boolean)))]
