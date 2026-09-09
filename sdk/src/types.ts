export type Flag = {
    key: string,
    enabled: boolean,
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
    
    ruleID: number,
    ruleName: string,
    conditions: {
      operator: string,
      conditions: {
        field: string,
        value: string,
        operator: string
      }[]
    },
    
    rollouts: {
      rolloutID: number,
      percentage: number,
      variantName: string,
      variantID: number,
      value: {
        param: string,
        val: any
      }
    }[]
}

// export type Rule__ = {
//     conditions: Condition[],
//     rolloutPercentage: number,
//     variant: Variant
// }

// export type Condition = {
//     attribute: string,
//     values: any,
//     operator: "equals" | "more than" | "less than"
// }


