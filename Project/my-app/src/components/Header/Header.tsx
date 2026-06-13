import clsx from 'clsx'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/logo-marusya.svg'
import SearchBar from '../Search/SearchBar'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__wrap}>
                    <Link to='/' className={styles.header__logo}>
                        <img src={Logo} alt="Логотип вк-маруся" className={styles['header__logo-img']} />
                    </Link>
                    <div className={styles.header__center}>
                        <nav className={styles.header__nav}>
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    clsx(styles.header__link, { [styles['header__link--active']]: isActive })
                                }
                            >
                                Главная
                            </NavLink>
                            <NavLink
                                to='/genres'
                                className={({ isActive }) =>
                                    clsx(styles.header__link, { [styles['header__link--active']]: isActive })
                                }
                            >
                                Жанры
                            </NavLink>
                        </nav>
                        <SearchBar />
                    </div>
                    <Link to='/login' className={styles.header__link}>Войти</Link>
                </div>
            </div>
        </header>
    )
}

export default Header
