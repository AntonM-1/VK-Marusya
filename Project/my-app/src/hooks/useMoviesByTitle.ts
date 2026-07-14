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

        const controller = new AbortController()
        const signal = controller.signal

        const timer = setTimeout(async () => {
            try {
                const data = await getMoviesByTitle(title, 5, { signal })
                setResults(data)
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return
                }
            }
        }, 500)

        return () => {
            clearTimeout(timer)
            controller.abort()
        }
    }, [title])

    return { results }
}

export default useMoviesByTitle
