import { describe, it, expect, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer, { setFavorites, toggleFavorite, selectFavoriteIds } from './favoritesSlice'

vi.mock('../api/favorites/postFavorite')
vi.mock('../api/favorites/deleteFavorite')

import { postFavorite } from '../api/favorites/postFavorite'
import { deleteFavorite } from '../api/favorites/deleteFavorite'

const makeStore = () => configureStore({ reducer: { favorites: favoritesReducer } })

describe('favoritesSlice', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('setFavorites заменяет список id', () => {
        const store = makeStore()
        store.dispatch(setFavorites(['1', '2']))
        expect(selectFavoriteIds(store.getState())).toEqual(['1', '2'])
    })

    it('toggleFavorite добавляет фильм через postFavorite, если он ещё не в избранном', async () => {
        const store = makeStore()
        store.dispatch(setFavorites(['1', '2']))
        vi.mocked(postFavorite).mockResolvedValue(undefined as never)

        await store.dispatch(toggleFavorite(3))

        expect(postFavorite).toHaveBeenCalledWith(3)
        expect(deleteFavorite).not.toHaveBeenCalled()
        expect(selectFavoriteIds(store.getState())).toEqual(['1', '2', '3'])
    })

    it('toggleFavorite удаляет фильм через deleteFavorite, если он уже в избранном', async () => {
        const store = makeStore()
        store.dispatch(setFavorites(['1', '3']))
        vi.mocked(deleteFavorite).mockResolvedValue(undefined as never)

        await store.dispatch(toggleFavorite(3))

        expect(deleteFavorite).toHaveBeenCalledWith(3)
        expect(postFavorite).not.toHaveBeenCalled()
        expect(selectFavoriteIds(store.getState())).toEqual(['1'])
    })

    it('не меняет состояние, если запрос к API завершился ошибкой', async () => {
        const store = makeStore()
        store.dispatch(setFavorites(['1']))
        vi.mocked(postFavorite).mockRejectedValue(new Error('network error'))

        await store.dispatch(toggleFavorite(2))

        expect(selectFavoriteIds(store.getState())).toEqual(['1'])
    })
})
