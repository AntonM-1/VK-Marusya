import styles from "./Footer.module.scss"
import IconVk from "../../assets/icon-vk.svg"
import IconYt from "../../assets/icon-youtube.svg"
import IconOk from "../../assets/icon-ok.svg"
import IconTg from "../../assets/icon-telegram.svg"

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className="container">
                <ul className={styles['footer__socials']}>
                    <li className={styles['footer__social']}>
                        <a href="#" className={styles['footer__link']}>
                            <img src={IconVk} alt="вконтакте" width='36' height='36' />
                        </a>
                    </li>
                    <li className={styles['footer__social']}>
                        <a href="#" className={styles['footer__link']}>
                            <img src={IconYt} alt="ютуб" width='36' height='36' />
                        </a>
                    </li>
                    <li className={styles['footer__social']}>
                        <a href="#" className={styles['footer__link']}>
                            <img src={IconOk} alt="одноклассники" width='36' height='36' />
                        </a>
                    </li>
                    <li className={styles['footer__social']}>
                        <a href="#" className={styles['footer__link']}>
                            <img src={IconTg} alt="телеграмм" width='36' height='36' />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer