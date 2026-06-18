import { useEffect, useState } from "react"
import { getGenres } from "../api/genres/getGenres"
import { getMoviesByGenre } from "../api/movies/getMoviesByGenre"
import { genreNames } from "../utils/genres"
import type { Genre } from "../types/Genre"

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        const fetchGenres = async () => {
            const rawGenres = await getGenres()

            const usedImages = new Set<string>()

            const enriched = await Promise.all(
                rawGenres.map(async (id) => {
                    const movies = await getMoviesByGenre(id, 10)
                    const unique = movies.find(m => m.backdropUrl && !usedImages.has(m.backdropUrl))
                    if (unique?.backdropUrl) usedImages.add(unique.backdropUrl)

                    return {
                        id,
                        name: genreNames[id] ?? id,
                        image: unique?.backdropUrl ?? `https://picsum.photos/seed/${id}/400/600`,
                    }
                })
            )

            setGenres(enriched)
        }

        fetchGenres()
    }, [])

    return { genres }
}

export default useGenres
