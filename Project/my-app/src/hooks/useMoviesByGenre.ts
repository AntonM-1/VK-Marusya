import { useEffect, useState } from "react"
import { getMoviesByGenre } from "../api/movies/getMoviesByGenre"
import type { Movie } from "../types/Movie"
import { useNotification } from "../context/NotificationContext"

const useMoviesByGenre = (genre: string) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const { showError } = useNotification()

    useEffect(() => {
        let cancelled = false
        setIsLoading(true)

        const fetchMovies = async () => {
            try {
                const newMovies = await getMoviesByGenre(genre, 10, page)
                if (cancelled) return
                setMovies(prev => [...prev, ...newMovies])
                if (newMovies.length < 10) setHasMore(false)
                setIsLoading(false)
            } catch {
                if (!cancelled) {
                    showError('Не удалось загрузить фильмы')
                    setIsLoading(false)
                }
            }
        }

        fetchMovies()

        return () => { cancelled = true }
    }, [genre, page])

    const loadMore = () => setPage(p => p + 1)

    return { movies, isLoading, hasMore, loadMore }
}

export default useMoviesByGenre
