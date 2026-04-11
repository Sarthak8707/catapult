export type Flag = {
    id: number,
    name: string,
    enabled: boolean,
    description?: string,
    createdAt: Date,
    rolloutPercentage: number
}

export type Context = {
    userID: number,
}