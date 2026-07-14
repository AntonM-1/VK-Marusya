import Footer from "../../components/Footer/Footer"
import Genres from "../../components/Genres/Genres"
import Header from "../../components/Header/Header"
import useGenres from "../../hooks/useGenres"

const GenresPage = () => {
    const { genres } = useGenres()

    return (
        <>
            <Header />
            <Genres genres={genres}/>
            <Footer />
        </>
    ) 
}

export default GenresPage