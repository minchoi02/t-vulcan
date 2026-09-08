import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import NavBar from './components/NavBar.jsx'
import StatusTabs from './components/StatusTabs.jsx'
import FilterToolbar from './components/FilterToolbar.jsx'
import ReceptionTable from './components/ReceptionTable.jsx'
import Pagination from './components/Pagination.jsx'
import DetailDrawer from './components/DetailDrawer.jsx'
import StatsPanel from './components/StatsPanel.jsx'
import { receptions, NAV_ITEMS } from './data/receptions.js'
import './App.css'

const PAGE_SIZE = 15

const EMPTY_FILTERS = {
  businessUnit: '사업부전체',
  partner: '협력업체전체',
  progress: '선택하세요',
  billing: '선택하세요',
  keyword: '',
  receiptNo: ''
}

export default function App() {
  const [activeUtility, setActiveUtility] = useState('업무접수현황')
  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0])
  const [activeStatus, setActiveStatus] = useState('all')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [detailRow, setDetailRow] = useState(null)

  const filteredRows = useMemo(() => {
    return receptions.filter((r) => {
      if (appliedFilters.partner !== '협력업체전체' && r.partner !== appliedFilters.partner) return false
      if (appliedFilters.progress !== '선택하세요' && r.progress !== appliedFilters.progress) return false
      if (appliedFilters.billing !== '선택하세요' && r.billing !== appliedFilters.billing) return false
      if (appliedFilters.receiptNo && !r.receiptNo.includes(appliedFilters.receiptNo.trim())) return false
      if (appliedFilters.keyword) {
        const k = appliedFilters.keyword.trim().toLowerCase()
        const haystack = `${r.plate} ${r.source} ${r.customer}`.toLowerCase()
        if (!haystack.includes(k)) return false
      }
      return true
    })
  }, [appliedFilters])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE))
  const pageRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearch() {
    setAppliedFilters(filters)
    setPage(1)
    setSelectedIds(new Set())
  }

  function toggleRow(no) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(no) ? next.delete(no) : next.add(no)
      return next
    })
  }

  function toggleAll(checked) {
    setSelectedIds(checked ? new Set(pageRows.map((r) => r.no)) : new Set())
  }

  function handleBulkDelete() {
    if (selectedIds.size === 0) return
    if (window.confirm(`선택한 ${selectedIds.size}건을 삭제하시겠습니까?`)) {
      setSelectedIds(new Set())
    }
  }

  return (
    <div className="app">
      <Header activeUtility={activeUtility} onUtilityChange={setActiveUtility} />
      <NavBar activeNav={activeNav} onNavChange={setActiveNav} />

      {activeUtility === '통계관리' ? (
        <StatsPanel />
      ) : (
        <main className="app__main">
          <div className="app__panel-head">
            <h2 className="app__panel-title">접수현황 리스트</h2>
            <span className="app__panel-count">
              총 <strong>{filteredRows.length.toLocaleString('ko-KR')}</strong>건
            </span>
          </div>

          <StatusTabs activeStatus={activeStatus} onStatusChange={setActiveStatus} />

          <FilterToolbar
            filters={filters}
            onFilterChange={setFilters}
            onSearch={handleSearch}
            selectedCount={selectedIds.size}
            onBulkDelete={handleBulkDelete}
          />

          <ReceptionTable
            rows={pageRows}
            selectedIds={selectedIds}
            onToggleRow={toggleRow}
            onToggleAll={toggleAll}
            onOpenDetail={setDetailRow}
          />

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </main>
      )}

      <DetailDrawer row={detailRow} onClose={() => setDetailRow(null)} />
    </div>
  )
}
