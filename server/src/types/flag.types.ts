export type Flag = {
    id: number,
    name: string,
    enabled: boolean,
    description?: string,
    createdAt: Date,
    rolloutPercentage: number,
    rules: Rule[],
    variants: Variant[]
}

export type FlagConfig = {
    enabled: boolean,
    rolloutPercentage: number
}

export type SDKFlagConfig = {
    flags: Record<number, FlagConfig>
}

export type Rule = {
    conditions: Conditions[],
    rolloutPercentage?: number,
    variant?: string
}

export type Variant = {
    name: string,
    weight: number
}

export type Conditions = {
    attribute: string,
    operator: "equals" | "or" | "in" | "less than" | "more than",
    value: any
}