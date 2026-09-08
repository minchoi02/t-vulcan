import './ReceptionTable.css'

const COLUMNS = [
  'No.', '접수번호', '유입경로', '고객명', '담당자', '차량번호', '차종',
  '의뢰구분', '의뢰일자', '협력업체(지사)', '매니저', '진행상태', '청구상태', 'REAR', '월신품가액'
]

function formatWon(n) {
  if (n == null) return ''
  return n.toLocaleString('ko-KR')
}

function progressTone(value) {
  if (value === '수리완료') return 'ok'
  if (value === '수리중') return 'warn'
  if (value === '픽업예정') return 'info'
  if (value === '배송중') return 'accent'
  return 'muted'
}

function billingTone(value) {
  if (value === '승인') return 'ok'
  if (value === '상신') return 'info'
  if (value === '대기') return 'warn'
  return 'muted'
}

export default function ReceptionTable({ rows, selectedIds, onToggleRow, onToggleAll, onOpenDetail }) {
  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.has(r.no))

  return (
    <div className="rtable-wrap">
      <table className="rtable">
        <thead>
          <tr>
            <th className="rtable__checkcol">
              <input type="checkbox" checked={allSelected} onChange={(e) => onToggleAll(e.target.checked)} />
            </th>
            {COLUMNS.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td className="rtable__empty" colSpan={COLUMNS.length + 1}>
                조건에 맞는 접수 건이 없습니다.
              </td>
            </tr>
          )}
          {rows.map((r) => (
            <tr key={r.no} className={selectedIds.has(r.no) ? 'is-selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.has(r.no)}
                  onChange={() => onToggleRow(r.no)}
                />
              </td>
              <td>{r.no}</td>
              <td>
                <a className="rtable__link" href="#detail" onClick={(e) => { e.preventDefault(); onOpenDetail(r) }}>
                  {r.receiptNo}
                </a>
              </td>
              <td>{r.source}</td>
              <td>{r.customer}</td>
              <td>{r.manager}</td>
              <td className="rtable__mono">{r.plate}</td>
              <td>{r.model}</td>
              <td>{r.requestType}</td>
              <td className="rtable__mono">{r.requestDate}</td>
              <td>
                {r.partner ? <a className="rtable__link" href="#partner">{r.partner}</a> : <span className="rtable__dash">-</span>}
              </td>
              <td>{r.carrier}</td>
              <td>
                <span className={`pill pill--${progressTone(r.progress)}`}>{r.progress}</span>
              </td>
              <td>
                <span className={`pill pill--${billingTone(r.billing)}`}>{r.billing}</span>
              </td>
              <td>
                <button className="rtable__view-btn" onClick={() => onOpenDetail(r)}>보기</button>
              </td>
              <td className="rtable__mono rtable__amount">{formatWon(r.monthlyAmount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
