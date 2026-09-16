import { Context, Flag, Rollout, Variant } from "../../types";
import { getVariantBucket } from "./variantBucket";

export const selectVariant = (rollouts: Rollout[], flag: Flag, context: Context)  => {
    
    const {userId} = context;

    // const variants = flag.variants;

    // if(variants === undefined) throw new Error("Variant does not exist!");

    const bucket = getVariantBucket(userId);
    //console.log("bucket", bucket);

    let cumulative = 0;

    for(const rollout of rollouts){
        cumulative += rollout.percentage
       // console.log("rollout percentage", rollout.percentage)
       // console.log("cumulative", cumulative);

        if(bucket < cumulative){
            return { variantName: rollout.variantName, value: rollout.value }
        }
    }

    throw new Error ("Percentages must add up to 100")
    
}