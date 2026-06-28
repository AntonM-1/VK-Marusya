export const deleteFavorite = async (movieId: number): Promise<void> => {
    await fetch(`https://cinemaguide.skillbox.cc/favorites/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
}
