export type Flag = {
    key: string,
    enabled: boolean,
    rolloutPercentage: number
}

export type FlagsResponse = {
    flags: Flag[];
}

export type FlagsClientOptions = {
    baseUrl: string,
    pollInterval: number
}

export type Context = {
    userId: number
}