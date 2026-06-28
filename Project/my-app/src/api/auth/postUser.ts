import type { User } from "../../types/User";

export const postUser = async (email: string, password: string, name: string, surname: string): Promise<User> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams({ email, password, name, surname }),
    })

    if (!response.ok) throw new Error('Ошибка регистрации')
    return response.json()
} 