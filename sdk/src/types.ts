export type Flag = {
    key: string,
    enabled: boolean
}

export type FlagsResponse = {
    flags: Flag[];
}

export type FlagsClientOptions = {
    baseUrl: string,
    pollInterval: number
}