import { createContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "../types/User"
import { getProfile } from "../api/auth/getProfile"
import { postLogin } from "../api/auth/postLogin"
import { postUser } from "../api/auth/postUser"
import { getLogout } from "../api/auth/getLogout"
import { useAppDispatch } from "../store/hooks"
import { setFavorites } from "../store/favoritesSlice"

interface AuthContextValue {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (name: string, surname: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getProfile().then(data => {
            setUser(prev => (prev !== null ? prev : data))
        })
    }, [])

    useEffect(() => {
        dispatch(setFavorites(user?.favorites ?? []))
    }, [user, dispatch])

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

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
