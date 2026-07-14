export const formatRuntime = (minutes?: number): string => {
    if (minutes === undefined || minutes === null) return '—';
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours === 0) return `${mins} мин`
    return `${hours} ч ${mins} мин`
}