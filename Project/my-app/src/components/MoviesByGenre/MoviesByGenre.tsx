import { Link } from "react-router-dom"
import Button from "../Button/Button"
import styles from "./MoviesByGenre.module.scss"
import IconArrowLeft from "../../assets/icon-arrow-left.svg"
import type { Movie } from "../../types/Movie"
import { genreNames } from "../../utils/genres"

type Props = {
    genre: string
    movies: Movie[]
    hasMore: boolean
    onLoadMore: () => void
}

const MoviesByGenre = ({ genre, movies, hasMore, onLoadMore }: Props) => {
    return (
        <section className={styles['movies-genre']}>
            <div className="container">
                <div className={styles['movies-genre__wrap']}>
                    <div className={styles['movies-genre__top']}>
                        <Link to='/genres'>
                            <img src={IconArrowLeft} alt="" className={styles['movies-genre__icon']} />
                        </Link>
                        <h2 className={styles['movies-genre__title']}>{genreNames[genre]}</h2>
                    </div>

                    <ul className={styles['movies-genre__list']}>
                        {movies.map(movie => (
                            <li className={styles['movies-genre__item']} key={movie.id}>
                                <Link to={`/movie/${movie.id}`} className={styles['movies-genre__card']}>
                                    <img src={movie.posterUrl} alt={movie.title} className={styles['movies-genre__img']} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {hasMore && <Button variant="accent" className={styles['movies-genre__btn']} onClick={onLoadMore}>Показать ещё</Button>}
                </div>
            </div>
        </section>
    )
}

export default MoviesByGenre