import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import HeroBanner from "../../components/HeroBanner/HeroBanner"
import TopMovies from "../../components/TopMovies/TopMovies"
import Loader from "../../components/Loader/Loader"
import { useRandomMovie } from "../../hooks/useRandomMovie"
import styles from "./HomePage.module.scss"

const HomePage = () => {
    const { movie, isLoading, refresh } = useRandomMovie()

    return (
        <>
            <Header />
            {isLoading || !movie ? (
                <main className={styles['home-page__loader']}>
                    <Loader />
                </main>
            ) : (
                <>
                    <HeroBanner movie={movie} onRefresh={refresh} />
                    <TopMovies />
                </>
            )}
            <Footer />
        </>
    )
}

export default HomePage
