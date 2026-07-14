import { useEffect, useState } from "react"
import type { Movie } from "../types/Movie"
import { getMovieById } from "../api/movies/getMovieById"
import { useNotification } from "../context/NotificationContext"

export const useMovie = (id: number) => {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { showError } = useNotification()

    useEffect(() => {
        let cancelled = false
        setIsLoading(true)

        if (id === undefined || isNaN(id)) return

        getMovieById(id)
            .then(data => {
                if (!cancelled) {
                    setMovie(data)
                    setIsLoading(false)
                }
            })
            .catch(() => {
                if (!cancelled) {
                    showError('Не удалось загрузить фильм')
                    setIsLoading(false)
                }
            })

        return () => { cancelled = true }
    }, [id])

    return { movie, isLoading }
}
