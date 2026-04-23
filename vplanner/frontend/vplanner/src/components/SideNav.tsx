import { ReactNode } from "react"
import styles from "./SideNav.module.css"

interface SideNavProps {
  children?: ReactNode
}

function SideNav({ children }: SideNavProps) {
  return <nav className={styles.sideNav}>{children}</nav>
}

export default SideNav
