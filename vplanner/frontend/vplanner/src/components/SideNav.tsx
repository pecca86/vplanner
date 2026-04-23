import { ReactNode } from "react"
import styles from "./SideNav.module.css"

interface SideNavProps {
  children?: ReactNode
}

function SideNav({ children }: SideNavProps) {
  return (
    <nav className={styles.sideNav}>
      <div className={styles.logo}>
        <svg
          className={styles.logoIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className={styles.logoText}>vplanner</span>
      </div>
      {children}
    </nav>
  )
}

export default SideNav
