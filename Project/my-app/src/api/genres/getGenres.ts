export const getGenres = async (): Promise<string[]> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/movie/genres')

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка загрузки жанров: ${response.status} ${errorText}`)
    }

    return response.json()
}