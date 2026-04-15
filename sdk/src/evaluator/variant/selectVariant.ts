import { Context, Flag, Variant } from "../../types";
import { getVariantBucket } from "./variantBucket";

export const selectVariant = (flagKey: string, flag: Flag, context: Context):  => {
    const {userId} = context;
    const variants = flag.variants;
    
    if(variants === undefined) throw new Error("Variant does not exist!");

    const bucket = getVariantBucket(flagKey, userId);

    let cumulative = 0;

    for(const variant of variants){
        cumulative += variant.weight;

        if(bucket < cumulative){
            return variant;
        }
    }
    
}