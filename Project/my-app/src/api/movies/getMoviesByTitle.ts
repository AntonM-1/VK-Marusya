import type { Movie } from "../../types/Movie";

export const getMoviesByTitle = async (title: string, count = 5, options?: RequestInit): Promise<Movie[]> => {
    const params = new URLSearchParams({
        title,
        count: String(count)
    })

    const response = await fetch(`https://cinemaguide.skillbox.cc/movie?${params.toString()}, ${options}`)

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка загрузки фильмов: ${response.status} ${errorText}`)
    }

    return response.json()
}