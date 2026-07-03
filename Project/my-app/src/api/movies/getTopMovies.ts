import type { Movie } from "../../types/Movie"


export const getTopMovies = async (): Promise<Movie[]> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/movie/top10')

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка загрузки фильмов: ${response.status} ${errorText}`)
    }

    return response.json()
}