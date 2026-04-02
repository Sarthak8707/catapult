export type Flag = {
    key: string;
    enabled: boolean
}

export type FlagsResponse = {
    flags: Flag[];
}