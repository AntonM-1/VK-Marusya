import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { postFavorite } from "../api/favorites/postFavorite"
import { deleteFavorite } from "../api/favorites/deleteFavorite"
import type { RootState } from "./store"

interface FavoritesState {
    ids: string[]
}

const initialState: FavoritesState = {
    ids: [],
}

export const toggleFavorite = createAsyncThunk<
    { id: string; isFavorite: boolean },
    number,
    { state: RootState }
>(
    'favorites/toggle',
    async (movieId, { getState }) => {
        const id = String(movieId)
        const wasFavorite = getState().favorites.ids.includes(id)

        if (wasFavorite) {
            await deleteFavorite(movieId)
        } else {
            await postFavorite(movieId)
        }

        return { id, isFavorite: !wasFavorite }
    }
)

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites(state, action: PayloadAction<string[]>) {
            state.ids = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(toggleFavorite.fulfilled, (state, action) => {
            const { id, isFavorite } = action.payload
            state.ids = isFavorite ? [...state.ids, id] : state.ids.filter(f => f !== id)
        })
    },
})

export const { setFavorites } = favoritesSlice.actions
export const selectFavoriteIds = (state: RootState) => state.favorites.ids
export default favoritesSlice.reducer
