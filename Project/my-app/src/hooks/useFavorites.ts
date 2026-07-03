import { useEffect, useState } from "react"
import type { Movie } from "../types/Movie"
import { getMovieById } from "../api/movies/getMovieById"
import { useNotification } from "../context/NotificationContext"

const useFavorites = (ids: string[]) => {
    const [favorites, setFavorites] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { showError } = useNotification()

    useEffect(() => {
        if (!ids.length) {
            setFavorites([])
            setIsLoading(false)
            return
        }
        let cancelled = false
        setIsLoading(true)

        const fetchFavorites = async () => {
            try {
                const movies = await Promise.all(ids.map(id => getMovieById(Number(id))))
                if (!cancelled) {
                    setFavorites(movies)
                    setIsLoading(false)
                }
            } catch {
                if (!cancelled) {
                    showError('Не удалось загрузить избранное')
                    setIsLoading(false)
                }
            }
        }

        fetchFavorites()
        return () => { cancelled = true }
    }, [ids])

    return { favorites, isLoading }
}

export default useFavorites
