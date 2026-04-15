import murmurhash from "murmurhash";

export function computeBucket(flagKey: string, userId: number, usecase: string) {
  const hash = murmurhash.v3(`${flagKey}:${userId}:${usecase}`);

  return hash % 100;
}