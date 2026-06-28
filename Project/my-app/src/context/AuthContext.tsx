import { createContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "../types/User"
import { getProfile } from "../api/auth/getProfile"
import { postLogin } from "../api/auth/postLogin"
import { postUser } from "../api/auth/postUser"
import { getLogout } from "../api/auth/getLogout"
import { postFavorite } from "../api/favorites/postFavorite"
import { deleteFavorite } from "../api/favorites/deleteFavorite"
import { useNotification } from "./NotificationContext"

interface AuthContextValue {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (name: string, surname: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    toggleFavorite: (movieId: number) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const { showError } = useNotification()

    useEffect(() => {
        getProfile().then(data => {
            setUser(prev => (prev !== null ? prev : data))
        })
    }, [])

    const login = async (email: string, password: string) => {
        await postLogin(email, password)
        const profile = await getProfile()
        setUser(profile)
    }

    const register = async (name: string, surname: string, email: string, password: string) => {
        await postUser(email, password, name, surname)
        const profile = await getProfile()
        setUser(profile)
    }

    const logout = async () => {
        await getLogout()
        setUser(null)
    }

    const toggleFavorite = async (movieId: number) => {
        if (!user) return
        const id = String(movieId)
        const isFav = user.favorites.includes(id)
        try {
            if (isFav) {
                await deleteFavorite(movieId)
                setUser(prev => prev ? { ...prev, favorites: prev.favorites.filter(f => f !== id) } : null)
            } else {
                await postFavorite(movieId)
                setUser(prev => prev ? { ...prev, favorites: [...prev.favorites, id] } : null)
            }
        } catch {
            showError('Не удалось обновить избранное')
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, toggleFavorite }}>
            {children}
        </AuthContext.Provider>
    )
}
