export type Flag = {
    key: string,
    enabled: boolean,
    rolloutPercentage: number,
    variants?: Variant[],
    rules: Rule[],
} 

export type FlagsResponse = {
    flags: Flag[];
}

export type FlagsClientOptions = {
    baseUrl: string,
    pollInterval: number
}

export type Context = {
    userId: number,
    attributes: Record<string, any>
}

export type Variant = {
    name: string,
    weight: number
}

export type Rule = {
    conditions: Condition[],
    rolloutPercentage: number,
    variant: Variant
}

export type Condition = {
    attribute: string,
    values: any [],
    operator: "equals" | "or" | "in" | "more than" | "less than"
}