import { useEffect, useState } from "react"
import type { Movie } from "../types/Movie"
import { getMovieById } from "../api/movies/getMovieById"

export const useMovie = (id: number) => {
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        let cancelled = false

        getMovieById(id).then(data => {
            if (!cancelled) setMovie(data)
        })

        return () => { cancelled = true }
    }, [id])

    return { movie }
}