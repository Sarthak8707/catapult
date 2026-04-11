import murmurhash from "murmurhash";

export const computeBucket = (flagName:string, userID: number) => {
    const hash = murmurhash.v3(`${flagName}:${userID}`);

    return hash % 100;
}