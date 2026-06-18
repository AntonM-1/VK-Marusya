import type { Movie } from "../../types/Movie";

export const getMoviesByTitle = async (title: string, count = 5): Promise<Movie[]> => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/movie?title=${title}&count=${count}`)
    return response.json()
}