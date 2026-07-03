import type { ReactNode } from 'react'
import styles from './PageTransition.module.scss'

const PageTransition = ({ children }: { children: ReactNode }) => (
    <div className={styles.wrapper}>
        {children}
    </div>
)

export default PageTransition
