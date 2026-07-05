export function formatNumber(value: number): string {
    if (value < 1_000) return Math.floor(value).toString();

    if (value < 1_000_000) {
        return `${(value / 1_000).toFixed(1)}K`
    }

    if (value < 1_000_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`
    }

    return `${(value / 1_000_000_000).toFixed(1)}B`
}