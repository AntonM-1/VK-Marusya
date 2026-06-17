import { useEffect, useState } from "react"
import { getRandomMovie } from "../api/movies/getRandomMovie"
import type { Movie } from "../types/Movie"

export const useRandomMovie = () => {
    const [movie, setMovie] = useState<Movie>()

    const fetchMovie = async () => {
        const data = await getRandomMovie()
        setMovie(data)
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    return { movie, refresh: fetchMovie }
}