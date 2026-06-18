import { Link } from "react-router-dom"
import styles from "./Genres.module.scss"
import type { Genre } from "../../types/Genre"

type Props = {
    genres: Genre[]
}

const Genres = ({ genres }: Props) => {

    return (
        <section className={styles['genres']}>
            <div className="container">
                <div className={styles['genres__wrap']}>
                    <h2 className={styles['genres__title']}>Жанры фильмов</h2>

                    <ul className={styles['genres__list']}>
                        {genres.map(genre => (
                            <li key={genre.id} className={styles['genres__item']}>
                                <Link to={`/genres/${genre.id}`} className={styles['genres__card']}>
                                    <img src={genre.image} alt={genre.name} className={styles['genres__img']} />
                                    <p className={styles['genres__name']}>{genre.name}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Genres