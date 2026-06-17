import type { Movie } from "../../types/Movie";

export const getMovieById = async (id: number): Promise<Movie> => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`)
    return response.json()
}