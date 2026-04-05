import { FlagCache } from "./cache";
import { fetchFlags } from "./fetcher";


export class FlagClient {
    private cache = new FlagCache();
    private baseUrl = "http://localhost:3000";
    private sdkKey: string

    constructor(sdkKey: string){
        this.sdkKey = sdkKey;
    }


    async init (){
        const data = await fetchFlags(this.baseUrl, this.sdkKey);
        this.cache.setFlags(data.flags);
    }
    isEnabled(key: string): boolean {
        const flag = this.cache.getFlag(key);
        return flag?.enabled ?? false 
    }

    async refresh(){
        const data = await fetchFlags(this.baseUrl, this.sdkKey);
        this.cache.setFlags(data.flags);
    }
}