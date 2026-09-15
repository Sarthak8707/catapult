

export type Flag = {

    id: number,
    name: string,
    key: string,
    type: string,
    environments?: Environment[],


    variants?: Variant[],
    
} 

export type Environment = {

  configID: number,
  environment: string,
  enabled: boolean,
  rules: Rule[]
}

export type Rule = {
    
    ruleID: number,
    ruleName: string,
    conditions: Conditions,
    rollouts: Rollout[]
}


export type Conditions = {

  operator: string,
  conditions: Condition[]

}

export type Condition = {

    field: string,
    value: any,
    operator: string

}

export type Rollout = {

    rolloutID: number,
    percentage: number,
    variantID: number,
    variantName: string,
    value: { param: string, value: any }
    //bucketBy?: any
}


//////-------

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


