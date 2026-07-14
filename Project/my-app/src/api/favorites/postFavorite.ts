export const postFavorite = async (movieId: number): Promise<void> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams({ id: String(movieId) }),
    })

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка добавления в избранное: ${response.status} ${errorText}`)
    }
}
