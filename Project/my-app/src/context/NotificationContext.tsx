import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import Notification from '../components/Notification/Notification'

export type NotificationItem = {
    id: number
    message: string
    dismissing: boolean
}

type NotificationContextValue = {
    showError: (message: string) => void
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

const DISPLAY_DURATION = 4000
const DISMISS_DURATION = 300

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([])
    const idRef = useRef(0)

    const startDismiss = useCallback((id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, dismissing: true } : n))
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id))
        }, DISMISS_DURATION)
    }, [])

    const showError = useCallback((message: string) => {
        const id = ++idRef.current
        setNotifications(prev => [...prev, { id, message, dismissing: false }])
        setTimeout(() => startDismiss(id), DISPLAY_DURATION)
    }, [startDismiss])

    return (
        <NotificationContext.Provider value={{ showError }}>
            {children}
            <Notification notifications={notifications} onDismiss={startDismiss} />
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const ctx = useContext(NotificationContext)
    if (!ctx) throw new Error('useNotification must be used inside NotificationProvider')
    return ctx
}
