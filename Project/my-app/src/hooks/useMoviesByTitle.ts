import { useEffect, useState } from "react"
import type { Movie } from "../types/Movie"
import { getMoviesByTitle } from "../api/movies/getMoviesByTitle"

const useMoviesByTitle = (title: string) => {
    const [results, setResults] = useState<Movie[]>([])

    useEffect(() => {
        if (!title) {
            setResults([])
            return
        }

        const timer = setTimeout(() => {
            getMoviesByTitle(title).then(setResults)
        }, 500)

        return () => clearTimeout(timer)
    }, [title])

    return { results }
}

export default useMoviesByTitle
