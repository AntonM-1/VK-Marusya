import type { Genre } from '../types/Genre'

export const genreNames: Record<string, string> = {
    'history': 'Исторический',
    'horror': 'Ужасы',
    'scifi': 'Фантастика',
    'stand-up': 'Стендап',
    'fantasy': 'Фэнтези',
    'drama': 'Драма',
    'mystery': 'Детектив',
    'family': 'Семейный',
    'comedy': 'Комедия',
    'romance': 'Мелодрама',
    'music': 'Музыка',
    'crime': 'Криминал',
    'tv-movie': 'Телефильм',
    'documentary': 'Документальный',
    'action': 'Боевик',
    'thriller': 'Триллер',
    'western': 'Вестерн',
    'animation': 'Анимация',
    'war': 'Военный',
    'adventure': 'Приключения',
}

export const enrichGenres = (rawGenres: string[]): Genre[] =>
    rawGenres.map(id => ({
        id,
        name: genreNames[id] ?? id,
        image: '',
    }))
