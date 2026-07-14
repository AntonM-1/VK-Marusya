import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import { Provider, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { AuthProvider } from './AuthContext'
import { NotificationProvider } from './NotificationContext'
import { useAuth } from '../hooks/useAuth'
import favoritesReducer, { selectFavoriteIds } from '../store/favoritesSlice'
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

const mockUser: User = {
    name: 'Иван',
    surname: 'Иванов',
    email: 'ivan@test.com',
    favorites: ['1', '2'],
}

const TestConsumer = () => {
    const { user, login, logout } = useAuth()
    const favorites = useSelector(selectFavoriteIds)
    return (
        <div>
            <span data-testid="email">{user?.email ?? 'null'}</span>
            <span data-testid="favorites">{favorites.join(',')}</span>
            <button onClick={() => login('ivan@test.com', 'pass')}>login</button>
            <button onClick={logout}>logout</button>
        </div>
    )
}

const makeStore = () => configureStore({ reducer: { favorites: favoritesReducer } })

const renderWithProvider = () => {
    const store = makeStore()
    return render(
        <Provider store={store}>
            <NotificationProvider>
                <AuthProvider><TestConsumer /></AuthProvider>
            </NotificationProvider>
        </Provider>
    )
}

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
                try { await login('ivan@test.com', 'pass') } catch { /* expected */ }
            }
            return (
                <div>
                    <span data-testid="email">{user?.email ?? 'null'}</span>
                    <button onClick={handleClick}>login-safe</button>
                </div>
            )
        }

        const store = makeStore()
        render(
            <Provider store={store}>
                <NotificationProvider><AuthProvider><SafeLoginConsumer /></AuthProvider></NotificationProvider>
            </Provider>
        )
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

    it('синхронизирует избранное пользователя в Redux при загрузке профиля', async () => {
        vi.mocked(getProfile).mockResolvedValue(mockUser)
        renderWithProvider()
        await waitFor(() => {
            expect(screen.getByTestId('favorites').textContent).toBe('1,2')
        })
    })

    it('очищает избранное в Redux после logout()', async () => {
        vi.mocked(getProfile).mockResolvedValue(mockUser)
        vi.mocked(getLogout).mockResolvedValue(undefined as never)

        renderWithProvider()
        await waitFor(() => {
            expect(screen.getByTestId('favorites').textContent).toBe('1,2')
        })

        await act(async () => {
            fireEvent.click(screen.getByText('logout'))
        })

        expect(screen.getByTestId('favorites').textContent).toBe('')
    })
})
