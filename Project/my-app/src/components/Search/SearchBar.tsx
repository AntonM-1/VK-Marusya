import styles from "./SearchBar.module.scss"
import IconSearch from "../../assets/icon-search.svg?react"
import IconStar from "../../assets/icon-star.svg?react"
import useMoviesByTitle from "../../hooks/useMoviesByTitle"
import { Link } from "react-router-dom"
import { createPortal } from "react-dom"
import { useState, useRef } from "react"
import type { Movie } from "../../types/Movie"
import { formatRuntime } from "../../utils/formatRuntime"
import clsx from "clsx"

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const { results } = useMoviesByTitle(query)
    const inputRef = useRef<HTMLInputElement>(null)

    const openMobile = () => {
        if (isMobileOpen) return
        setIsMobileOpen(true)
        setTimeout(() => inputRef.current?.focus(), 50)
    }

    const closeMobile = () => {
        setIsMobileOpen(false)
        setQuery('')
    }

    const handleSelect = () => {
        setQuery('')
        setIsMobileOpen(false)
    }

    return (
        <div className={clsx(styles.search, { [styles['search--open']]: isMobileOpen })}>
            {isMobileOpen && createPortal(
                <div className={styles['search__overlay']} onClick={closeMobile} />,
                document.body
            )}
            <button
                className={styles['search__icon-btn']}
                onClick={openMobile}
                aria-label="Открыть поиск"
            >
                <IconSearch className={styles['search__icon']} />
            </button>
            <input
                ref={inputRef}
                type="text"
                placeholder="Поиск"
                className={styles.search__input}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button
                className={styles['search__close-btn']}
                onClick={closeMobile}
                aria-label="Закрыть поиск"
            >
                ✕
            </button>

            {results.length > 0 && (
                <ul className={styles['search__dropdown-list']}>
                    {results.map((movie: Movie) => (
                        <li className={styles['search__dropdown-item']} key={movie.id}>
                            <Link
                                to={`/movie/${movie.id}`}
                                className={styles['search__dropdown-row']}
                                onClick={handleSelect}
                            >
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
                                                <IconStar className={styles['search__dropdown-icon']} />
                                                <span>{movie.tmdbRating.toFixed(1)}</span>
                                            </div>
                                            <span>{movie.releaseYear}</span>
                                            <span>{movie.genres[0]}</span>
                                            <span>{formatRuntime(movie.runtime)}</span>
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
