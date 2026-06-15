import { Link } from "react-router-dom"
import styles from "./TopMovies.module.scss"
import { useTopMovies } from "../../hooks/useTopMovies"

const TopMovies = () => {
    const { movies } = useTopMovies()
    
    return (
        <section className={styles['top-movies']}>
            <div className="container">
                <div className={styles['top-movies__wrap']}>
                    <h2 className={styles['top-movies__title']}>Топ 10 фильмов</h2>

                    <ol className={styles['top-movies__list']}>
                        {movies.map(movie => (
                            <li className={styles['top-movies__item']} key={movie.id}>
                                <Link to='' className={styles['top-movies__link']}>
                                    <img src={movie.posterUrl} alt="Изображение" className={styles['top-movies__img']} />
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}

export default TopMovies