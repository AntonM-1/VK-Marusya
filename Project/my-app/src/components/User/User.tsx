import styles from "./User.module.scss"
import IconFav from "../../assets/icon-fav.svg?react"
import IconUser from "../../assets/icon-user.svg?react"
import IconMail from "../../assets/icon-mail.svg?react"
import { useAuth } from "../../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import clsx from "clsx"
import useFavorites from "../../hooks/useFavorites"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { selectFavoriteIds, toggleFavorite } from "../../store/favoritesSlice"
import { useNotification } from "../../context/NotificationContext"

const User = () => {
    const [tabs, setTabs] = useState<'favorites' | 'settings'>('favorites')
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const favoriteIds = useAppSelector(selectFavoriteIds)
    const { favorites, isLoading } = useFavorites(favoriteIds)
    const { showError } = useNotification()

    return (
        <div className={styles['user']}>
            <div className="container">
                <div className={styles['user__wrapper']}>
                    <h2 className={styles["user__title"]}>Мой аккаунт</h2>

                    <div className={styles["user__tabs"]}>
                        <div className={clsx(styles["user__tab"], {
                            [styles["user__tab--active"]]: tabs === 'favorites'
                        })}
                            onClick={() => setTabs('favorites')}>
                            <IconFav className={styles["user__tab-icon"]} />
                            <span className={styles["user__tab-link"]}>
                                <span className={styles["user__tab-link--full"]}>Избранные фильмы</span>
                                <span className={styles["user__tab-link--short"]}>Избранное</span>
                            </span>
                        </div>
                        <div className={clsx(styles["user__tab"], {
                            [styles["user__tab--active"]]: tabs === 'settings'
                        })}
                            onClick={() => setTabs('settings')}>
                            <IconUser className={styles["user__tab-icon"]} />
                            <span className={styles["user__tab-link"]}>
                                <span className={styles["user__tab-link--full"]}>Настройка аккаунта</span>
                                <span className={styles["user__tab-link--short"]}>Настройки</span>
                            </span>
                        </div>
                    </div>
                    {tabs === 'favorites' && (
                        isLoading ? (
                            <div className={styles["user__loader"]}>
                                <Loader />
                            </div>
                        ) : (
                            <ul className={styles["user__movies-list"]}>
                                {favorites.map(movie => (
                                    <li className={styles["user__movies-item"]} key={movie.id}>
                                        <Link to={`/movie/${movie.id}`} className={styles['user__movies-card']}>
                                            <img src={movie.posterUrl} alt="" />
                                        </Link>
                                        <button
                                            className={styles['user__movies-remove']}
                                            onClick={() => dispatch(toggleFavorite(movie.id)).unwrap().catch(() => showError('Не удалось обновить избранное'))}
                                        >✕</button>
                                    </li>
                                ))}
                            </ul>
                        )
                    )}
                    {tabs === 'settings' && (
                        <div className={styles["user__setings"]}>
                            <div className={styles["user__fields"]}>
                                <div className={styles["user__field"]}>
                                    <div className={styles["user__avatar"]}>
                                        {user?.name?.[0]}{user?.surname?.[0]}
                                    </div>
                                    <div className={styles["user__text"]}>
                                        <span className={styles["user__label"]}>Имя Фамилия</span>
                                        <span className={styles["user__main"]}>{`${user?.name} ${user?.surname}`}</span>
                                    </div>
                                </div>
                                <div className={styles["user__field"]}>
                                    <div className={styles["user__avatar"]}>
                                        <IconMail />
                                    </div>
                                    <div className={styles["user__text"]}>
                                        <span className={styles["user__label"]}>Электронная почта</span>
                                        <span className={styles["user__main"]}>{user?.email}</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="accent" className={styles['user__btn']} onClick={async () => { await logout(); navigate('/') }}>Выйти из аккаунта</Button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default User