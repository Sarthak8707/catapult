import { computeBucket } from "../hash"

export const getVariantBucket = (userID: number) => {
    const bucket = computeBucket(userID, "variant");
    return bucket;
}