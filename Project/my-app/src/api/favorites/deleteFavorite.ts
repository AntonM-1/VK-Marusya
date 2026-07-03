export const deleteFavorite = async (movieId: number): Promise<void> => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/favorites/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
    })

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка удаления из избранного: ${response.status} ${errorText}`)
    }
}
