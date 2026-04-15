import { computeBucket } from "../hash"

export const getVariantBucket = (flagKey: string, userID: number) => {
    const bucket = computeBucket(flagKey, userID, "variant");
    return bucket;
}