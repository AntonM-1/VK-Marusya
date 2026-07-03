import { useParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import HeroBanner from "../../components/HeroBanner/HeroBanner"
import { useMovie } from "../../hooks/useMovie"
import MovieDetails from "../../components/MovieDetails/MovieDetails"
import Footer from "../../components/Footer/Footer"
import Loader from "../../components/Loader/Loader"
import styles from "./MoviePage.module.scss"

const MoviePage = () => {
    const { id } = useParams()
    const { movie, isLoading } = useMovie(Number(id))

    return (
        <>
            <Header />
            {isLoading || !movie ? (
                <main className={styles['movie-page__loader']}>
                    <Loader />
                </main>
            ) : (
                <>
                    <HeroBanner movie={movie} actionsVariant="row" />
                    <MovieDetails movie={movie} />
                </>
            )}
            <Footer />
        </>
    )
}

export default MoviePage
