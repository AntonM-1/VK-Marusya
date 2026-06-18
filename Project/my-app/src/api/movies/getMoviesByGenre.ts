import type { Movie } from "../../types/Movie"

export const getMoviesByGenre = async (genre: string, count = 10, page = 1): Promise<Movie[]> => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/movie?genre=${genre}&count=${count}&page=${page}`)
    return response.json()
}