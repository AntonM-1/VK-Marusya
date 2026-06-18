export const getGenres = async (): Promise<string[]> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/movie/genres')
    return response.json()
}