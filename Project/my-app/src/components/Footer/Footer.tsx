import styles from "./Footer.module.scss"
import IconVk from "../../assets/icon-vk.svg?react"
import IconYt from "../../assets/icon-youtube.svg?react"
import IconOk from "../../assets/icon-ok.svg?react"
import IconTg from "../../assets/icon-telegram.svg?react"

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className="container">
                <ul className={styles['footer__socials']}>
                    <li className={styles['footer__social']}>
                        <a href="#" className={styles['footer__link']}>
                            <IconVk className={styles['footer__icon']} />
                        </a>
                    </li>
                    <li className={styles['footer__social']}>
                        <a href="#" className={styles['footer__link']}>
                            <IconYt className={styles['footer__icon']} />
                        </a>
                    </li>
                    <li className={styles['footer__social']}>
                        <a href="#" className={styles['footer__link']}>
                            <IconOk className={styles['footer__icon']} />
                        </a>
                    </li>
                    <li className={styles['footer__social']}>
                        <a href="#" className={styles['footer__link']}>
                            <IconTg className={styles['footer__icon']} />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
