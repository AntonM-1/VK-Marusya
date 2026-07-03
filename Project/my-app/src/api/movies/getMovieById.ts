import type { Movie } from "../../types/Movie";

export const getMovieById = async (id: number): Promise<Movie> => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`)

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка загрузки фильма: ${response.status} ${errorText}`)
    }

    return response.json()
}