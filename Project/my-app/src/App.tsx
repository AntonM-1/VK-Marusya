import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import MoviePage from "./pages/MoviePage/MoviePage"
import GenresPage from "./pages/GenresPage/GenresPage"
import MoviesByGenrePage from "./pages/MoviesByGenrePage/MoviesByGenrePage"
import { AuthProvider } from "./context/AuthContext"
import UserPage from "./pages/UserPage/UserPage"
import PageTransition from "./components/PageTransition/PageTransition"

function App() {
    const location = useLocation()

    return (
        <AuthProvider>
            <PageTransition key={location.pathname}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movie/:id" element={<MoviePage />} />
                    <Route path="/genres" element={<GenresPage />} />
                    <Route path="/genres/:id" element={<MoviesByGenrePage />} />
                    <Route path="/user" element={<UserPage />} />
                </Routes>
            </PageTransition>
        </AuthProvider>
    )
}

export default App
