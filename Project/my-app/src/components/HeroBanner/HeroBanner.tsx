import { Link } from "react-router-dom"
import styles from "./HeroBanner.module.scss"
import IconFav from "../../assets/icon-fav.svg"
import IconRefresh from "../../assets/icon-refresh.svg"
import ImgPrev from "../../assets/img-prev.png"
import IconStar from "../../assets/icon-star.svg"
import clsx from "clsx"
import { useRandomMovie } from "../../hooks/useRandomMovie"
import { formatRuntime } from "../../utils/formatRuntime"


const HeroBanner = () => {
    const { movie } = useRandomMovie()
    const rating = movie?.tmdbRating ?? 0;

    return (
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
                                    <span className={styles['hero-banner__number']}>{rating}</span>
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
                        <div className={styles['hero-banner__actions']}>
                            <button className={clsx(styles['hero-banner__btn'], 'btn', 'btn--accent')}>Трейлер</button>
                            <Link to='' className={clsx(styles['hero-banner__btn'], 'btn')}>О фильме</Link>
                            <button className={clsx(styles['hero-banner__btn'], 'btn', 'btn--small')}>
                                <img src={IconFav} width='24' height='24' />
                            </button>
                            <button className={clsx(styles['hero-banner__btn'], 'btn', 'btn--small')}>
                                <img src={IconRefresh} width='24' height='24' />
                            </button>
                        </div>
                    </div>
                    <div className={styles['hero-banner__right-side']}>
                        <img src={movie?.backdropUrl} alt="Изображение" className={styles['hero-banner__img']} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner