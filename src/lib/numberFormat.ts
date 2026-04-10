function trimTrailingZero(value: string) {
    return value.replace(/\.0$/, "");
}

export function formatUsdCompact(value: number) {
    const absValue = Math.abs(value);

    if (absValue >= 1_000_000_000) {
        return `$${trimTrailingZero((value / 1_000_000_000).toFixed(1))}B`;
    }

    if (absValue >= 1_000_000) {
        return `$${trimTrailingZero((value / 1_000_000).toFixed(1))}M`;
    }

    if (absValue >= 1_000) {
        return `$${Math.round(value).toLocaleString("en-US")}`;
    }

    return `$${Math.round(value)}`;
}

export function formatNumberCompact(value: number) {
    const absValue = Math.abs(value);

    if (absValue >= 1_000_000_000) {
        return `${trimTrailingZero((value / 1_000_000_000).toFixed(2))}B`;
    }

    if (absValue >= 1_000_000) {
        return `${trimTrailingZero((value / 1_000_000).toFixed(2))}M`;
    }

    if (absValue >= 1_000) {
        return `${trimTrailingZero((value / 1_000).toFixed(1))}K`;
    }

    return `${Math.round(value)}`;
}
