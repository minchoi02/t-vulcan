import { STATUS_TABS } from '../data/receptions'
import './StatusTabs.css'

export default function StatusTabs({ activeStatus, onStatusChange }) {
  return (
    <div className="status-tabs" role="tablist" aria-label="접수 상태 필터">
      {STATUS_TABS.map((tab, idx) => (
        <span key={tab.key} className="status-tabs__group">
          {idx > 0 && <span className="status-tabs__sep">|</span>}
          <button
            role="tab"
            aria-selected={activeStatus === tab.key}
            className={`status-tabs__item${activeStatus === tab.key ? ' is-active' : ''}`}
            onClick={() => onStatusChange(tab.key)}
          >
            {tab.label}
          </button>
        </span>
      ))}
    </div>
  )
}
