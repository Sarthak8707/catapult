import { FlagCache } from "./cache";
import { evaluateFlag } from "./evaluator/flagEvaluator";
import { fetchFlags } from "./fetcher";
import { Context, Flag } from "./types";


export class FlagClient {
    private cache = new FlagCache();
    private baseUrl = "http://localhost:3000";
    private sdkKey: string

    constructor(sdkKey: string){
        this.sdkKey = sdkKey;
    }

    // Initialize 
    async init () {
        //const data = await fetchFlags(this.baseUrl, this.sdkKey);
        const data = await fetchFlags();
        this.cache.setFlags(data);
    }

    testSomething(){
        let a = this.cache.getFlag("greeting")?.environments || [] ;
        const b = a.filter((e) => e.environment == "dev");
        const r = b[0].rules;
        return r[1].conditions;

        

    }

    // Check for enabled
    isEnabled(key: string, env: string): boolean {
        const envs = this.cache.getFlag(key)?.environments;
        
        const e = envs?.filter((obj) => obj.environment == env);

        if(e) return e[0].enabled

        return false
    }

    // Refresh
    async refresh(){
        // const data = await fetchFlags(this.baseUrl, this.sdkKey);
        // this.cache.setFlags(data.flags);
    }

    // Evaluate flag against context
    evaluate(flagKey: string, context: Context): any {

        const flag = this.cache.getFlag(flagKey);
        if(flag === undefined) throw new Error("flag does not exist!");
        
        return evaluateFlag(flagKey, "dev", flag, context);
    }

    
}