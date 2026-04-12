export type Flag = {
    id: number,
    name: string,
    enabled: boolean,
    description?: string,
    createdAt: Date,
    rolloutPercentage: number
}

export type FlagConfig = {
    enabled: boolean,
    rolloutPercentage: number
}

export type SDKFlagConfig = {
    flags: Record<number, FlagConfig>
}