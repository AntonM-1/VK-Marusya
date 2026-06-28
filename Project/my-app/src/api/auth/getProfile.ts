import type { User } from "../../types/User"

export const getProfile = async (): Promise<User | null> => {
    const response = await fetch('https://cinemaguide.skillbox.cc/profile', {
        credentials: 'include',
    })
    if (!response.ok) return null
    return response.json()
}