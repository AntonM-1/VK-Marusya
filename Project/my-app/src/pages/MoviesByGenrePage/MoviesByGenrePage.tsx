import { useParams } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import useMoviesByGenre from "../../hooks/useMoviesByGenre"
import MoviesByGenre from "../../components/MoviesByGenre/MoviesByGenre"

const MoviesByGenrePage = () => {
    const { id } = useParams()
    const { movies, isLoading, hasMore, loadMore } = useMoviesByGenre(id ?? '')

    return (
        <>
            <Header />
            <MoviesByGenre
                genre={id ?? ''}
                movies={movies}
                hasMore={hasMore}
                onLoadMore={loadMore}
            />
            <Footer />
        </>
    )
}

export default MoviesByGenrePage