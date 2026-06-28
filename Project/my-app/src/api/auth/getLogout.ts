export const getLogout = async (): Promise<void> => {
    await fetch('https://cinemaguide.skillbox.cc/auth/logout', {
        credentials: 'include',
    })
}