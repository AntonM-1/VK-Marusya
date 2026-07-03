import { Link, useMatch } from "react-router-dom"
import styles from "./HeroBanner.module.scss"
import IconFav from "../../assets/icon-fav.svg?react"
import IconRefresh from "../../assets/icon-refresh.svg?react"
import IconStar from "../../assets/icon-star.svg?react"
import clsx from "clsx"
import { formatRuntime } from "../../utils/formatRuntime"
import Button from "../Button/Button"
import type { Movie } from "../../types/Movie"
import { useState } from "react"
import ModalTrailer from "../ModalTrailer/ModalTrailer"
import ModalAuth from "../ModalAuth/ModalAuth"
import { useAuth } from "../../hooks/useAuth"

type Props = {
    movie: Movie | null
    onRefresh?: () => void
    actionsVariant?: 'grid' | 'row'
}

const HeroBanner = ({ movie, onRefresh, actionsVariant = 'grid' }: Props) => {
    const rating = movie?.tmdbRating ?? 0;
    const isMoviePage = useMatch('/movie/:id')

    const [isModalTrailerOpen, setIsModalTrailerOpen] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const { user, toggleFavorite } = useAuth()
    const isFavorite = movie ? user?.favorites.includes(String(movie.id)) : false

    const handleFavClick = () => {
        if (!user) { setIsAuthOpen(true); return }
        if (movie) toggleFavorite(movie.id)
    }

    return (
        <>
            <section className={styles['hero-banner']}>
                <div className="container">
                    <div className={styles['hero-banner__wrap']}>
                        <div className={styles['hero-banner__left-side']}>
                            <div className={styles['hero-banner__about-film']}>
                                <div className={styles['hero-banner__info']}>
                                    <div className={clsx(styles['hero-banner__rating'], {
                                        [styles['hero-banner__rating--gold']]: rating >= 8,
                                        [styles['hero-banner__rating--green']]: rating >= 7 && rating < 8,
                                        [styles['hero-banner__rating--gray']]: rating >= 5 && rating < 7,
                                        [styles['hero-banner__rating--red']]: rating < 5,
                                    })}>
                                        <IconStar className={styles['hero-banner__star-icon']} />
                                        <span className={styles['hero-banner__number']}>{rating.toFixed(1)}</span>
                                    </div>
                                    <span className={styles['hero-banner__year']}>{movie?.releaseYear}</span>
                                    <span className={styles['hero-banner__genre']}>{movie?.genres[0]}</span>
                                    <span className={styles['hero-banner__runtime']}>{formatRuntime(movie?.runtime)}</span>
                                </div>
                                <div className={styles['hero-banner__text']}>
                                    <h2 className={styles['hero-banner__title']}>{movie?.title}</h2>
                                    <p className={styles['hero-banner__description']}>{movie?.plot}</p>
                                </div>
                            </div>
                            <div className={clsx(styles['hero-banner__actions'], styles[`hero-banner__actions--${actionsVariant}`])}>
                                <Button variant="accent" className={styles['hero-banner__btn']} onClick={() => setIsModalTrailerOpen(true)}>Трейлер</Button>
                                {!isMoviePage && <Button as={Link} to={`movie/${movie?.id}`} className={styles['hero-banner__btn']}>О фильме</Button>}
                                <Button
                                    variant="small"
                                    className={styles['hero-banner__btn']}
                                    onClick={handleFavClick}
                                >
                                    <IconFav
                                        width='24'
                                        height='24'
                                        className={clsx({ [styles['hero-banner__fav-icon--active']]: isFavorite })}
                                    />
                                </Button>
                                {onRefresh && <Button variant="small" onClick={onRefresh} className={styles['hero-banner__btn']}>
                                    <IconRefresh className={styles['hero-banner__refresh-icon']} />
                                </Button>}
                            </div>
                        </div>
                        <div className={styles['hero-banner__right-side']}>
                            <img src={movie?.backdropUrl || 'http://dummyimage.com/1'} alt="Изображение" className={styles['hero-banner__img']} />
                        </div>
                    </div>
                </div>
            </section>
            <ModalAuth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <ModalTrailer isOpen={isModalTrailerOpen}
                onClose={() => setIsModalTrailerOpen(false)}
                trailerYouTubeId={movie?.trailerYouTubeId ?? ''}
                title={movie?.title}
            />
        </>
    )
}

export default HeroBanner