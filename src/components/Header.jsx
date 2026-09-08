import './Header.css'

const UTILITY_LINKS = ['운영정보', '업무접수현황', '통계관리', '경리회계관리']

export default function Header({ activeUtility, onUtilityChange }) {
  return (
    <header className="hero">
      <div className="hero__scrim" />
      <div className="hero__branch">[대전본사]<span className="hero__caret">▾</span></div>
      <div className="hero__top">
        <div className="hero__title-block">
          <p className="hero__eyebrow">OFF-LINE RECEPTION CONSOLE</p>
          <h1 className="hero__title">
            T-<span className="hero__title-accent">벌컨</span>(VULCAN) 오프라인 접수
          </h1>
        </div>
        <nav className="hero__utility" aria-label="유틸리티 메뉴">
          {UTILITY_LINKS.map((label) => (
            <button
              key={label}
              className={`hero__utility-btn${activeUtility === label ? ' is-active' : ''}`}
              onClick={() => onUtilityChange(label)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="hero__session">
        <span className="hero__session-dot" />
        로그인 · 김노아 매니저
      </div>
    </header>
  )
}
