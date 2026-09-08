import { NAV_ITEMS } from '../data/receptions'
import './NavBar.css'

export default function NavBar({ activeNav, onNavChange }) {
  return (
    <nav className="navbar" aria-label="주 메뉴">
      {NAV_ITEMS.map((label) => (
        <button
          key={label}
          className={`navbar__item${activeNav === label ? ' is-active' : ''}`}
          onClick={() => onNavChange(label)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
