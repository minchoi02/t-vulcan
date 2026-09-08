import { resourceSummary, resourceTrend, processTable, monthlyVolume, statusBreakdown } from '../data/systemStats'
import './StatsPanel.css'

function buildLinePath(values, max, width, height) {
  const step = width / (values.length - 1)
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${(height - (v / max) * height).toFixed(1)}`)
    .join(' ')
}

function TrendChart() {
  const width = 640
  const height = 160
  const max = 100
  const cpuPath = buildLinePath(resourceTrend.map((d) => d.cpu), max, width, height)
  const ramPath = buildLinePath(resourceTrend.map((d) => d.ram), max, width, height)

  return (
    <div className="trend-chart">
      <svg viewBox={`0 0 ${width} ${height + 24}`} preserveAspectRatio="none" role="img" aria-label="24시간 CPU/RAM 사용률 추이">
        {[0, 25, 50, 75, 100].map((g) => (
          <line
            key={g}
            x1={0}
            x2={width}
            y1={height - (g / max) * height}
            y2={height - (g / max) * height}
            className="trend-chart__grid"
          />
        ))}
        <path d={cpuPath} className="trend-chart__line trend-chart__line--cpu" />
        <path d={ramPath} className="trend-chart__line trend-chart__line--ram" />
      </svg>
      <div className="trend-chart__legend">
        <span><i className="dot dot--cpu" /> CPU</span>
        <span><i className="dot dot--ram" /> RAM</span>
        <span className="trend-chart__range">최근 24시간 · 매시 샘플링</span>
      </div>
    </div>
  )
}

function ResourceCard({ item }) {
  return (
    <div className={`resource-card resource-card--${item.tone}`}>
      <div className="resource-card__top">
        <span className="resource-card__label">{item.label}</span>
        <span className="resource-card__value">{item.value}{item.unit}</span>
      </div>
      <div className="resource-card__bar">
        <div className="resource-card__bar-fill" style={{ width: `${item.value}%` }} />
      </div>
      <p className="resource-card__detail">{item.detail}</p>
    </div>
  )
}

function formatWon(n) {
  return `${(n / 10000).toLocaleString('ko-KR')}만원`
}

export default function StatsPanel() {
  const maxVolume = Math.max(...monthlyVolume.map((m) => m.count))
  const totalStatus = statusBreakdown.reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="stats-panel">
      <section className="stats-section">
        <h2 className="stats-section__title">서버 리소스 · 시스템 분석</h2>
        <div className="resource-grid">
          {resourceSummary.map((item) => (
            <ResourceCard key={item.key} item={item} />
          ))}
        </div>
        <div className="stats-two-col">
          <div className="stats-card">
            <h3>CPU / RAM 24시간 추이</h3>
            <TrendChart />
          </div>
          <div className="stats-card">
            <h3>주요 프로세스</h3>
            <table className="process-table">
              <thead>
                <tr><th>프로세스</th><th>PID</th><th>CPU</th><th>RAM(MB)</th></tr>
              </thead>
              <tbody>
                {processTable.map((p) => (
                  <tr key={p.pid}>
                    <td>{p.name}</td>
                    <td className="mono">{p.pid}</td>
                    <td className="mono">{p.cpu.toFixed(1)}%</td>
                    <td className="mono">{p.ram.toLocaleString('ko-KR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="stats-section__title">접수 통계</h2>
        <div className="stats-two-col">
          <div className="stats-card">
            <h3>월별 접수 건수 / 청구금액</h3>
            <div className="bar-chart">
              {monthlyVolume.map((m) => (
                <div className="bar-chart__col" key={m.month}>
                  <span className="bar-chart__value">{m.count}</span>
                  <div className="bar-chart__track">
                    <div
                      className="bar-chart__fill"
                      style={{ height: `${(m.count / maxVolume) * 100}%` }}
                    />
                  </div>
                  <span className="bar-chart__label">{m.month}</span>
                  <span className="bar-chart__amount">{formatWon(m.amount)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="stats-card">
            <h3>진행상태 분포</h3>
            <ul className="status-list">
              {statusBreakdown.map((s) => (
                <li key={s.label} className="status-list__row">
                  <span className={`status-list__dot status-list__dot--${s.tone}`} />
                  <span className="status-list__label">{s.label}</span>
                  <div className="status-list__track">
                    <div
                      className={`status-list__fill status-list__fill--${s.tone}`}
                      style={{ width: `${(s.count / totalStatus) * 100}%` }}
                    />
                  </div>
                  <span className="status-list__count">{s.count}건</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
