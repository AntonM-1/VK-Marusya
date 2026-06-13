import { Link } from "react-router-dom"
import styles from "./TopMovies.module.scss"
import ImgTop from "../../assets/img-top.png"

const TopMovies = () => {
    return (
        <section className={styles['top-movies']}>
            <div className="container">
                <div className={styles['top-movies__wrap']}>
                    <h2 className={styles['top-movies__title']}>Топ 10 фильмов</h2>

                    <ol className={styles['top-movies__list']}>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                        <li className={styles['top-movies__item']}>
                            <Link to='' className={styles['top-movies__link']}>
                                <img src={ImgTop} alt="Изображение" className={styles['top-movies__img']}/>
                            </Link>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    )
}

export default TopMovies