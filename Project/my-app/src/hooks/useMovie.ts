import { useEffect, useState } from "react"
import type { Movie } from "../types/Movie"
import { getMovieById } from "../api/movies/getMovieById"

export const useMovie = (id: number) => {
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        getMovieById(id).then(setMovie)
    }, [id])

    return { movie }
}