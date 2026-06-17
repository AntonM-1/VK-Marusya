import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import HeroBanner from "../../components/HeroBanner/HeroBanner"
import TopMovies from "../../components/TopMovies/TopMovies"
import { useRandomMovie } from "../../hooks/useRandomMovie"
import styles from "./HomePage.module.scss"

const HomePage = () => {
    const { movie, refresh } = useRandomMovie()

    if (!movie) return null

    return (
        <>
            <Header />
            <HeroBanner movie={movie} onRefresh={refresh} />
            <TopMovies />
            <Footer />
        </>
    )
}

export default HomePage