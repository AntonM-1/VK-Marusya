import styles from "./SearchBar.module.scss"
import IconSearch from "../../assets/icon-search.svg?react"
import IconStar from "../../assets/icon-star.svg"
import useMoviesByTitle from "../../hooks/useMoviesByTitle"
import { Link } from "react-router-dom"
import { useState } from "react"
import type { Movie } from "../../types/Movie"
import { formatRuntime } from "../../utils/formatRuntime"
import clsx from "clsx"


const SearchBar = () => {
    const [query, setQuery] = useState('')
    const { results } = useMoviesByTitle(query)

    return (
        <div className={styles.search}>
            <IconSearch className={styles.search__icon} />
            <input
                type="text"
                placeholder="Поиск"
                className={styles.search__input}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            {results.length > 0 && (
                <ul className={styles['search__dropdown-list']}>
                    {results.map((movie: Movie) => (
                        <li className={styles['search__dropdown-item']} key={movie.id}>
                            <Link to={`/movie/${movie.id}`} className={styles['search__dropdown-row']} onClick={() => setQuery('')}>
                                <div className={styles['search__dropdown-wrap']}>
                                    <img src={movie.posterUrl} alt="" className={styles['search__dropdown-img']} />
                                    <div className={styles['search__dropdown-info']}>
                                        <div className={styles['search__dropdown-top']}>
                                            <div className={clsx(styles['search__dropdown-rating'], {
                                                [styles['search__dropdown-rating--gold']]: movie.tmdbRating >= 8,
                                                [styles['search__dropdown-rating--green']]: movie.tmdbRating >= 7 && movie.tmdbRating < 8,
                                                [styles['search__dropdown-rating--gray']]: movie.tmdbRating >= 5 && movie.tmdbRating < 7,
                                                [styles['search__dropdown-rating--red']]: movie.tmdbRating < 5,
                                            })}>
                                                <img src={IconStar} alt="" className={styles['search__dropdown-icon']} />
                                                <span className={styles['search__dropdown-numer']}>{movie.tmdbRating.toFixed(1)}</span>
                                            </div>
                                            <span className={styles['search__dropdown-year']}>{movie.releaseYear}</span>
                                            <span className={styles['search__dropdown-genre']}>{movie.genres[0]}</span>
                                            <span className={styles['search__dropdown-runtime']}>{formatRuntime(movie.runtime)}</span>
                                        </div>
                                        <p className={styles['search__dropdown-name']}>{movie.title}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar