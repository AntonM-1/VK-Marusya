import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import MoviePage from "./pages/MoviePage/MoviePage"
import GenresPage from "./pages/GenresPage/GenresPage"
import MoviesByGenrePage from "./pages/MoviesByGenrePage/MoviesByGenrePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/genres" element={<GenresPage />} />
      <Route path="/genres/:id" element={<MoviesByGenrePage />} />
    </Routes>
  )
}

export default App
