import { BUSINESS_UNITS, PARTNER_FILTERS, PROGRESS_OPTIONS, BILLING_OPTIONS } from '../data/receptions'
import './FilterToolbar.css'

export default function FilterToolbar({ filters, onFilterChange, onSearch, selectedCount, onBulkDelete }) {
  const set = (key) => (e) => onFilterChange({ ...filters, [key]: e.target.value })

  return (
    <div className="toolbar">
      <div className="toolbar__row toolbar__row--top">
        <div className="toolbar__left">
          <button className="toolbar__ghost-btn" onClick={onBulkDelete} disabled={selectedCount === 0}>
            선택삭제{selectedCount > 0 ? ` (${selectedCount})` : ''}
          </button>
          <select className="toolbar__select" value={filters.businessUnit} onChange={set('businessUnit')}>
            {BUSINESS_UNITS.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>
        <div className="toolbar__exports">
          <button className="toolbar__link">중복제외</button>
          <span className="toolbar__link toolbar__link--file">📊 엑셀다운로드</span>
          <span className="toolbar__link toolbar__link--file">📄 거래명세서양식다운로드</span>
          <span className="toolbar__link toolbar__link--file">📊 지사지급양식다운로드</span>
        </div>
      </div>

      <div className="toolbar__row toolbar__row--search">
        <select className="toolbar__select" value={filters.partner} onChange={set('partner')}>
          {PARTNER_FILTERS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select className="toolbar__select" value={filters.progress} onChange={set('progress')}>
          <option>선택하세요</option>
          {PROGRESS_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <input
          className="toolbar__input"
          placeholder="차량번호 / 고객명 검색"
          value={filters.keyword}
          onChange={set('keyword')}
        />
        <select className="toolbar__select" value={filters.billing} onChange={set('billing')}>
          <option>선택하세요</option>
          {BILLING_OPTIONS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <input
          className="toolbar__input toolbar__input--narrow"
          placeholder="접수번호"
          value={filters.receiptNo}
          onChange={set('receiptNo')}
        />
        <button className="toolbar__search-btn" onClick={onSearch}>
          검색
        </button>
      </div>
    </div>
  )
}
