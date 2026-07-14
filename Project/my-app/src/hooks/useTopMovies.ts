import { useEffect, useState } from "react"
import { getTopMovies } from "../api/movies/getTopMovies"
import type { Movie } from "../types/Movie"

export const useTopMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        let cancelled = false

        const loadMovies = async () => {
            const data = await getTopMovies()
            if (!cancelled) setMovies(data)
        }

        loadMovies()

        return () => { cancelled = true }
    }, [])

    return { movies }
}