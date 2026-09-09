import { Flag } from "./types";


export class FlagCache {
    private flags = new Map<string, Flag>();
    private something: any

    setSomething(someData: any){
        this.something = someData;
    }

    getSomething(){
        return this.something;
    }

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