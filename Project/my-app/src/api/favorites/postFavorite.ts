export const postFavorite = async (movieId: number): Promise<void> => {
    await fetch('https://cinemaguide.skillbox.cc/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams({ id: String(movieId) }),
    })
}
