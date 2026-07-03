import type { Movie } from "../../types/Movie"

export const getMoviesByGenre = async (genre: string, count = 10, page = 1): Promise<Movie[]> => {
    const params = new URLSearchParams({
        genre,
        count: String(count),
        page: String(page),
    })

    const response = await fetch(`https://cinemaguide.skillbox.cc/movie?${params.toString()}`)

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка загрузки фильмов: ${response.status} ${errorText}`)
    }

    return response.json()
}