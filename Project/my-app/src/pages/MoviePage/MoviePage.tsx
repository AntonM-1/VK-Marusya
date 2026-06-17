import { useParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import HeroBanner from "../../components/HeroBanner/HeroBanner"
import { useMovie } from "../../hooks/useMovie"
import MovieDetails from "../../components/MovieDetails/MovieDetails"
import Footer from "../../components/Footer/Footer"

const MoviePage = () => {
    const { id } = useParams()
    const { movie } = useMovie(Number(id))

    if (!movie) return null

    return (
        <>
            <Header />
            <HeroBanner movie={movie} actionsVariant="row" />
            <MovieDetails movie={movie} />
            <Footer />
        </>
    )
}

export default MoviePage