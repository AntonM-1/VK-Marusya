import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import { AuthProvider } from './AuthContext'
import { NotificationProvider } from './NotificationContext'
import { useAuth } from '../hooks/useAuth'
import type { User } from '../types/User'

vi.mock('../api/auth/getProfile')
vi.mock('../api/auth/postLogin')
vi.mock('../api/auth/postUser')
vi.mock('../api/auth/getLogout')
vi.mock('../api/favorites/postFavorite')
vi.mock('../api/favorites/deleteFavorite')

import { getProfile } from '../api/auth/getProfile'
import { postLogin } from '../api/auth/postLogin'
import { getLogout } from '../api/auth/getLogout'
import { postFavorite } from '../api/favorites/postFavorite'
import { deleteFavorite } from '../api/favorites/deleteFavorite'

const mockUser: User = {
    name: 'Иван',
    surname: 'Иванов',
    email: 'ivan@test.com',
    favorites: ['1', '2'],
}

const TestConsumer = ({ movieId = 3 }: { movieId?: number } = {}) => {
    const { user, login, logout, toggleFavorite } = useAuth()
    return (
        <div>
            <span data-testid="email">{user?.email ?? 'null'}</span>
            <span data-testid="favorites">{user?.favorites.join(',') ?? ''}</span>
            <button onClick={() => login('ivan@test.com', 'pass')}>login</button>
            <button onClick={logout}>logout</button>
            <button onClick={() => toggleFavorite(movieId)}>toggle</button>
        </div>
    )
}

const renderWithProvider = (movieId?: number) =>
    render(
        <NotificationProvider>
            <AuthProvider><TestConsumer movieId={movieId} /></AuthProvider>
        </NotificationProvider>
    )

describe('AuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('user равен null до разрешения getProfile', () => {
        vi.mocked(getProfile).mockResolvedValue(null)
        renderWithProvider()
        expect(screen.getByTestId('email').textContent).toBe('null')
    })

    it('восстанавливает сессию при монтировании если getProfile вернул пользователя', async () => {
        vi.mocked(getProfile).mockResolvedValue(mockUser)
        renderWithProvider()
        await waitFor(() => {
            expect(screen.getByTestId('email').textContent).toBe('ivan@test.com')
        })
    })

    it('login() вызывает postLogin и getProfile, затем устанавливает user', async () => {
        vi.mocked(getProfile)
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockUser)
        vi.mocked(postLogin).mockResolvedValue(undefined as never)

        renderWithProvider()
        await waitFor(() => expect(screen.getByTestId('email').textContent).toBe('null'))

        await act(async () => {
            fireEvent.click(screen.getByText('login'))
        })

        expect(postLogin).toHaveBeenCalledWith('ivan@test.com', 'pass')
        expect(getProfile).toHaveBeenCalledTimes(2)
        await waitFor(() => {
            expect(screen.getByTestId('email').textContent).toBe('ivan@test.com')
        })
    })

    it('login() оставляет user null при ошибке авторизации', async () => {
        vi.mocked(getProfile).mockResolvedValue(null)
        vi.mocked(postLogin).mockRejectedValue(new Error('Неверный email или пароль'))

        const SafeLoginConsumer = () => {
            const { user, login } = useAuth()
            const handleClick = async () => {
                try { await login('ivan@test.com', 'pass') } catch {}
            }
            return (
                <div>
                    <span data-testid="email">{user?.email ?? 'null'}</span>
                    <button onClick={handleClick}>login-safe</button>
                </div>
            )
        }

        render(<NotificationProvider><AuthProvider><SafeLoginConsumer /></AuthProvider></NotificationProvider>)
        await waitFor(() => expect(screen.getByTestId('email').textContent).toBe('null'))

        await act(async () => {
            fireEvent.click(screen.getByText('login-safe'))
        })

        expect(postLogin).toHaveBeenCalledWith('ivan@test.com', 'pass')
        expect(screen.getByTestId('email').textContent).toBe('null')
    })

    it('logout() сбрасывает user и вызывает getLogout', async () => {
        vi.mocked(getProfile).mockResolvedValue(mockUser)
        vi.mocked(getLogout).mockResolvedValue(undefined as never)

        renderWithProvider()
        await waitFor(() => {
            expect(screen.getByTestId('email').textContent).toBe('ivan@test.com')
        })

        await act(async () => {
            fireEvent.click(screen.getByText('logout'))
        })

        expect(getLogout).toHaveBeenCalledOnce()
        expect(screen.getByTestId('email').textContent).toBe('null')
    })

    it('toggleFavorite() добавляет фильм через postFavorite и обновляет список', async () => {
        vi.mocked(getProfile).mockResolvedValue({ ...mockUser, favorites: ['1', '2'] })
        vi.mocked(postFavorite).mockResolvedValue(undefined as never)

        renderWithProvider(3)
        await waitFor(() => {
            expect(screen.getByTestId('favorites').textContent).toBe('1,2')
        })

        await act(async () => {
            fireEvent.click(screen.getByText('toggle'))
        })

        expect(postFavorite).toHaveBeenCalledWith(3)
        expect(deleteFavorite).not.toHaveBeenCalled()
        expect(screen.getByTestId('favorites').textContent).toBe('1,2,3')
    })

    it('toggleFavorite() удаляет фильм через deleteFavorite если он уже в избранном', async () => {
        vi.mocked(getProfile).mockResolvedValue({ ...mockUser, favorites: ['1', '3'] })
        vi.mocked(deleteFavorite).mockResolvedValue(undefined as never)

        renderWithProvider(3)
        await waitFor(() => {
            expect(screen.getByTestId('favorites').textContent).toBe('1,3')
        })

        await act(async () => {
            fireEvent.click(screen.getByText('toggle'))
        })

        expect(deleteFavorite).toHaveBeenCalledWith(3)
        expect(postFavorite).not.toHaveBeenCalled()
        expect(screen.getByTestId('favorites').textContent).toBe('1')
    })

    it('race condition: медленный getProfile при монтировании не перезаписывает залогиненного user', async () => {
        let resolveInitialProfile!: (v: User | null) => void
        vi.mocked(getProfile)
            .mockReturnValueOnce(new Promise(res => { resolveInitialProfile = res }))
            .mockResolvedValueOnce(mockUser)
        vi.mocked(postLogin).mockResolvedValue(undefined as never)

        renderWithProvider()

        await act(async () => {
            fireEvent.click(screen.getByText('login'))
        })
        await waitFor(() => {
            expect(screen.getByTestId('email').textContent).toBe('ivan@test.com')
        })

        await act(async () => {
            resolveInitialProfile(null)
        })

        expect(screen.getByTestId('email').textContent).toBe('ivan@test.com')
    })
})
