import { useEffect, useState } from "react"
import { getTopMovies } from "../api/movies/getTopMovies"
import type { Movie } from "../types/Movie"

export const useTopMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        const loadMovies = async () => {
            const data = await getTopMovies()
            setMovies(data)
        }

        loadMovies()

        return () => {}
    }, [])

    return { movies }
}