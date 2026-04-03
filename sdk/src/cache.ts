import { Flag } from "./types";


export class FlagCache {
    private flags = new Map<string, Flag>();

    setFlags(flags: Flag[]){
        for(const flag of flags){
            this.flags.set(flag.key, flag);
        }
    }
    getFlag(key: string): Flag | undefined {
        return this.flags.get(key);
    }
    getAllFlags(){
        return Array.from(this.flags.values());
    }
}