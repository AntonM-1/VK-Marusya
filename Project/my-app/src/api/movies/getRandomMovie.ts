import type { Movie } from "../../types/Movie";

export const getRandomMovie = async (): Promise<Movie> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/movie/random')

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка загрузки фильмов: ${response.status} ${errorText}`)
    }

    return response.json()
}