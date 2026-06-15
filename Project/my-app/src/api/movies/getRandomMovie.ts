import type { Movie } from "../../types/Movie";

export const getRandomMovie = async (): Promise<Movie> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/movie/random')
    return response.json()
}