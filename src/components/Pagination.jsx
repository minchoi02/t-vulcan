import './Pagination.css'

export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1)

  return (
    <div className="pagination">
      <button
        className="pagination__nav"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="이전 페이지"
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`pagination__page${p === page ? ' is-active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="pagination__nav"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="다음 페이지"
      >
        ›
      </button>
    </div>
  )
}
