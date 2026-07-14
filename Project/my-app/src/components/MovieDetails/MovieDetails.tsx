import type { Movie } from "../../types/Movie"
import styles from "./MovieDetails.module.scss"

interface DetailRow {
    label: string
    value: string
}

const MovieDetails = ({ movie }: { movie: Movie }) => {
    const languageNames = new Intl.DisplayNames(['ru'], {type: 'language'})

    const details: DetailRow[] = [
        { label: 'Язык оригинала', value: languageNames.of(movie.language) ?? movie.language},
        { label: 'Бюджет', value: `${movie.budget} руб.`},
        { label: 'Выручка', value: `${movie.revenue} руб.`},
        { label: 'Режиссёр', value: movie.director},
        { label: 'Продакшен', value: movie.production},
        { label: 'Награды', value: movie.awardsSummary},
    ]

    return (
        <section className={styles['movie-details']}>
            <div className="container">
                <h2 className={styles['movie-details__title']}>О фильме</h2>
                <div className={styles['movie-details__rows']}>
                    {details.map((item, index) => (
                        <div className={styles['movie-details__row']} key={index}>
                            <span className={styles['movie-details__label']}>{item.label}</span>
                            <span className={styles['movie-details__dots']}></span>
                            <span className={styles['movie-details__value']}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MovieDetails