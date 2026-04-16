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
        const data = await fetchFlags(this.baseUrl, this.sdkKey);
        this.cache.setFlags(data.flags);
    }

    // Check for enabled
    isEnabled(key: string): boolean {
        const flag = this.cache.getFlag(key);
        return flag?.enabled ?? false 
    }

    // Refresh
    async refresh(){
        const data = await fetchFlags(this.baseUrl, this.sdkKey);
        this.cache.setFlags(data.flags);
    }

    // Evaluate flag against context
    evaluate(flagKey: string, context: Context) {

        const flag = this.cache.getFlag(flagKey);
        if(flag === undefined) throw new Error("flag does not exist!");
        
        return evaluateFlag(flagKey, flag, context);
    }

    
}