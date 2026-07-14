import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import useMoviesByGenre from './useMoviesByGenre'
import type { Movie } from '../types/Movie'

vi.mock('../api/movies/getMoviesByGenre')
vi.mock('../context/NotificationContext', () => ({
    useNotification: () => ({ showError: vi.fn() }),
}))
import { getMoviesByGenre } from '../api/movies/getMoviesByGenre'

const makeMovies = (count: number, offset = 0): Movie[] =>
    Array.from({ length: count }, (_, i) => ({
        id: offset + i + 1,
        title: `Film ${offset + i + 1}`,
        releaseYear: 2020,
        genres: ['drama'],
        runtime: 120,
        tmdbRating: 7,
        plot: '',
        backdropUrl: '',
        posterUrl: '',
        trailerYouTubeId: '',
        language: 'en',
        budget: '0',
        revenue: '0',
        director: '',
        production: '',
        awardsSummary: '',
    }))

describe('useMoviesByGenre', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('загружает первые 10 фильмов при монтировании', async () => {
        const movies = makeMovies(10)
        vi.mocked(getMoviesByGenre).mockResolvedValue(movies)

        const { result } = renderHook(() => useMoviesByGenre('drama'))

        await waitFor(() => {
            expect(result.current.movies).toHaveLength(10)
        })
        expect(getMoviesByGenre).toHaveBeenCalledWith('drama', 10, 1)
    })

    it('устанавливает hasMore=false когда API вернул меньше 10 фильмов', async () => {
        vi.mocked(getMoviesByGenre).mockResolvedValue(makeMovies(7))

        const { result } = renderHook(() => useMoviesByGenre('drama'))

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })
        expect(result.current.hasMore).toBe(false)
    })

    it('устанавливает hasMore=true когда API вернул ровно 10 фильмов', async () => {
        vi.mocked(getMoviesByGenre).mockResolvedValue(makeMovies(10))

        const { result } = renderHook(() => useMoviesByGenre('drama'))

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })
        expect(result.current.hasMore).toBe(true)
    })

    it('loadMore() запрашивает следующую страницу и добавляет фильмы к списку', async () => {
        vi.mocked(getMoviesByGenre)
            .mockResolvedValueOnce(makeMovies(10, 0))
            .mockResolvedValueOnce(makeMovies(10, 10))

        const { result } = renderHook(() => useMoviesByGenre('drama'))

        await waitFor(() => {
            expect(result.current.movies).toHaveLength(10)
        })

        act(() => {
            result.current.loadMore()
        })

        await waitFor(() => {
            expect(result.current.movies).toHaveLength(20)
        })
        expect(getMoviesByGenre).toHaveBeenNthCalledWith(2, 'drama', 10, 2)
    })

    it('loadMore() устанавливает hasMore=false когда вторая страница неполная', async () => {
        vi.mocked(getMoviesByGenre)
            .mockResolvedValueOnce(makeMovies(10, 0))
            .mockResolvedValueOnce(makeMovies(3, 10))

        const { result } = renderHook(() => useMoviesByGenre('drama'))
        await waitFor(() => expect(result.current.movies).toHaveLength(10))

        act(() => { result.current.loadMore() })

        await waitFor(() => {
            expect(result.current.hasMore).toBe(false)
        })
        expect(result.current.movies).toHaveLength(13)
    })

    it('отмена запроса при размонтировании не обновляет state', async () => {
        let resolveMovies!: (v: Movie[]) => void
        vi.mocked(getMoviesByGenre).mockReturnValue(
            new Promise(res => { resolveMovies = res })
        )

        const { result, unmount } = renderHook(() => useMoviesByGenre('drama'))
        unmount()

        // разрешаем промис ПОСЛЕ размонтирования
        act(() => { resolveMovies(makeMovies(10)) })

        // state не должен обновиться — movies остаётся пустым
        expect(result.current.movies).toHaveLength(0)
    })
})
