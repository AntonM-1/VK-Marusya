import { useEffect, useState } from "react"
import { getRandomMovie } from "../api/movies/getRandomMovie"
import type { Movie } from "../types/Movie"
import { useNotification } from "../context/NotificationContext"

export const useRandomMovie = () => {
    const [movie, setMovie] = useState<Movie | undefined>()
    const [isLoading, setIsLoading] = useState(true)
    const { showError } = useNotification()

    const fetchMovie = async () => {
        setIsLoading(true)
        try {
            const data = await getRandomMovie()
            setMovie(data)
        } catch {
            showError('Не удалось загрузить фильм')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    return { movie, isLoading, refresh: fetchMovie }
}
