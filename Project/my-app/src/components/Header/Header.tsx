import clsx from 'clsx'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/logo-marusya.svg'
import SearchBar from '../Search/SearchBar'
import styles from './Header.module.scss'
import IconGenres from '../../assets/icon-genres.svg'
import IconUser from '../../assets/icon-user.svg'

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
                                    clsx(styles.header__link, { [styles['header__link--active']]: isActive }, styles['header__link--home-page'])
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
                                <span className={styles['header__link-text']}>Жанры</span>
                                <img className={styles['header__link-icon']} src={IconGenres} width='24' height='24' />
                            </NavLink>
                        </nav>
                        <SearchBar />
                        <Link to='/login' className={styles.header__link}>
                            <span className={styles['header__link-text']}>Войти</span>
                            <img className={styles['header__link-icon']} src={IconUser} width='24' height='24' />
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
