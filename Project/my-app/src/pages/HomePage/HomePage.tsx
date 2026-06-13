import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import HeroBanner from "../../components/HeroBanner/HeroBanner"
import TopMovies from "../../components/TopMovies/TopMovies"
import styles from "./HomePage.module.scss"

const HomePage = () => {
    return (
        <>
            <Header />
            <HeroBanner />
            <TopMovies />
            <Footer />
        </>
    )
}

export default HomePage