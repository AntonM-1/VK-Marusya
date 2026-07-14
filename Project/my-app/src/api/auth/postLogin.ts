import type { User } from "../../types/User"

export const postLogin = async (email: string, password: string): Promise<User> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/auth/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams({ email, password }),
    })

    if (!response.ok) throw new Error('Неверный email или пароль')
    return response.json()
}
