import './DetailDrawer.css'

function formatWon(n) {
  if (n == null) return '-'
  return `${n.toLocaleString('ko-KR')}원`
}

export default function DetailDrawer({ row, onClose }) {
  if (!row) return null

  const fields = [
    ['접수번호', row.receiptNo],
    ['유입경로', row.source],
    ['고객명', row.customer],
    ['담당자', row.manager],
    ['차량번호', row.plate],
    ['차종', row.model],
    ['의뢰구분', row.requestType],
    ['의뢰일자', row.requestDate],
    ['협력업체(지사)', row.partner || '-'],
    ['매니저', row.carrier],
    ['진행상태', row.progress],
    ['청구상태', row.billing],
    ['월신품가액', formatWon(row.monthlyAmount)]
  ]

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer__header">
          <h2>접수 상세 · {row.receiptNo}</h2>
          <button className="drawer__close" onClick={onClose} aria-label="닫기">✕</button>
        </div>
        <dl className="drawer__grid">
          {fields.map(([label, value]) => (
            <div className="drawer__row" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="drawer__footer">
          <button className="drawer__btn drawer__btn--ghost" onClick={onClose}>닫기</button>
          <button className="drawer__btn">저장</button>
        </div>
      </aside>
    </div>
  )
}
