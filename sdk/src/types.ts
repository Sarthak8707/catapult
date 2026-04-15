export type Flag = {
    key: string,
    enabled: boolean,
    rolloutPercentage: number,
    variants?: Variant[]
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

export type Variant = {
    name: string,
    weight: number
}