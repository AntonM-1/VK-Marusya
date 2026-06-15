import type { Movie } from "../../types/Movie"


export const getTopMovies = async (): Promise<Movie[]> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/movie/top10')
    return response.json()
}