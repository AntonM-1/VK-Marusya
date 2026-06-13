import { Link } from "react-router-dom"
import styles from "./HeroBanner.module.scss"
import IconFav from "../../assets/icon-fav.svg"
import IconRefresh from "../../assets/icon-refresh.svg"
import ImgPrev from "../../assets/img-prev.png"
import IconStar from "../../assets/icon-star.svg"
import clsx from "clsx"


const HeroBanner = () => {
    return (
        <section className={styles['hero-banner']}>
            <div className="container">
                <div className={styles['hero-banner__wrap']}>
                    <div className={styles['hero-banner__left-side']}>
                        <div className={styles['hero-banner__about-film']}>
                            <div className={styles['hero-banner__info']}>
                                <div className={styles['hero-banner__rating']}>
                                    <img src={IconStar} width='16' height='16'/>
                                    <span className={styles['hero-banner__number']}>7,5</span>
                                </div>
                                <span className={styles['hero-banner__year']}>1979</span>
                                <span className={styles['hero-banner__genre']}>детектив</span>
                                <span className={styles['hero-banner__duration']}>1 ч 7 мин</span>
                            </div>
                            <div className={styles['hero-banner__text']}>
                                <h2 className={styles['hero-banner__title']}>Шерлок Холмс и доктор Ватсон: Знакомство</h2>
                                <p className={styles['hero-banner__description']}>Увлекательные приключения самого известного сыщика всех времен</p>
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
                        <img src={ImgPrev} alt="Изображение" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner