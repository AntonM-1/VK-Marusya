import clsx from 'clsx'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/logo-marusya.svg'
import SearchBar from '../Search/SearchBar'
import styles from './Header.module.scss'
import IconGenres from '../../assets/icon-genres.svg?react'
import IconUser from '../../assets/icon-user.svg?react'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import ModalAuth from '../ModalAuth/ModalAuth'

const Header = () => {
    const { user } = useAuth()
    const [isAuthOpen, setIsAuthOpen] = useState(false)

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__wrap}>
                    <Link to='/' className={styles.header__logo}>
                        <img src={Logo} alt="Логотип вк-маруся" className={styles['header__logo-img']} width='143' height='32' />
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
                                <IconGenres className={styles['header__link-icon']} />
                            </NavLink>
                        </nav>
                        <SearchBar />
                        {user ? (
                            <NavLink to='/user' className={({ isActive }) =>
                                clsx(styles.header__link, { [styles['header__link--active']]: isActive })
                            }>
                                <span className={styles['header__link-text']}>{user.surname}</span>
                                <IconUser className={styles['header__link-icon']} />
                            </NavLink>
                        ) : (
                            <button onClick={() => setIsAuthOpen(true)} className={styles.header__link}>
                                <span className={styles['header__link-text']}>Войти</span>
                                <IconUser className={styles['header__link-icon']} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ModalAuth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </header >
    )
}

export default Header
