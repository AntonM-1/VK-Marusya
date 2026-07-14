export const getLogout = async (): Promise<void> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/auth/logout', {
        credentials: 'include',
    })

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка выхода: ${response.status} ${errorText}`)
    }
}