import { Link, useMatch } from "react-router-dom"
import styles from "./HeroBanner.module.scss"
import IconFav from "../../assets/icon-fav.svg"
import IconRefresh from "../../assets/icon-refresh.svg"
import IconStar from "../../assets/icon-star.svg"
import clsx from "clsx"
import { formatRuntime } from "../../utils/formatRuntime"
import Button from "../Button/Button"
import type { Movie } from "../../types/Movie"
import { useState } from "react"
import ModalTrailer from "../ModalTrailer/ModalTrailer"

type Props = {
    movie: Movie | null
    onRefresh?: () => void
    actionsVariant?: 'grid' | 'row'
}

const HeroBanner = ({ movie, onRefresh, actionsVariant = 'grid' }: Props) => {
    const rating = movie?.tmdbRating ?? 0;
    const isMoviePage = useMatch('/movie/:id')

    const [isModalTrailerOpen, setIsModalTrailerOpen] = useState(false)

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
                                        <img src={IconStar} width='16' height='16' />
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
                                <Button variant="small" className={styles['hero-banner__btn']}>
                                    <img src={IconFav} width='24' height='24' />
                                </Button>
                                {onRefresh && <Button variant="small" onClick={onRefresh} className={styles['hero-banner__btn']}>
                                    <img src={IconRefresh} width='24' height='24' />
                                </Button>}
                            </div>
                        </div>
                        <div className={styles['hero-banner__right-side']}>
                            <img src={movie?.backdropUrl} alt="Изображение" className={styles['hero-banner__img']} />
                        </div>
                    </div>
                </div>
            </section>
            <ModalTrailer isOpen={isModalTrailerOpen}
                onClose={() => setIsModalTrailerOpen(false)}
                trailerYouTubeId={movie?.trailerYouTubeId ?? ''}
                title={movie?.title}
            />
        </>
    )
}

export default HeroBanner