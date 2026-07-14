import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import styles from "./MoviesByGenre.module.scss"
import IconArrowLeft from "../../assets/icon-arrow-left.svg?react"
import type { Movie } from "../../types/Movie"
import { genreNames } from "../../utils/genres"
import Loader from "../Loader/Loader"

type Props = {
    genre: string
    movies: Movie[]
    hasMore: boolean
    isLoading: boolean
    onLoadMore: () => void
}

const MoviesByGenre = ({ genre, movies, hasMore, isLoading, onLoadMore }: Props) => {
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel || !hasMore || isLoading) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) onLoadMore()
        })

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [hasMore, isLoading, onLoadMore])

    return (
        <section className={styles['movies-genre']}>
            <div className="container">
                <div className={styles['movies-genre__wrap']}>
                    <div className={styles['movies-genre__top']}>
                        <Link to='/genres'>
                            <IconArrowLeft className={styles['movies-genre__icon']} />
                        </Link>
                        <h2 className={styles['movies-genre__title']}>{genreNames[genre]}</h2>
                    </div>

                    {movies.length === 0 && isLoading ? (
                        <div className={styles['movies-genre__loader']}>
                            <Loader />
                        </div>
                    ) : (
                        <ul className={styles['movies-genre__list']}>
                            {movies.map(movie => (
                                <li className={styles['movies-genre__item']} key={movie.id}>
                                    <Link to={`/movie/${movie.id}`} className={styles['movies-genre__card']}>
                                        <img src={movie?.posterUrl || 'http://dummyimage.com/1'} alt={movie.title} className={styles['movies-genre__img']} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {movies.length > 0 && isLoading && (
                        <div className={styles['movies-genre__loader']}>
                            <Loader />
                        </div>
                    )}

                    {hasMore && !isLoading && (
                        <div ref={sentinelRef} className={styles['movies-genre__sentinel']} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default MoviesByGenre
