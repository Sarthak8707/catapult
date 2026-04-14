import murmurhash from "murmurhash";

export function computeBucket(flagKey: string, userId: number) {
  const hash = murmurhash.v3(`${flagKey}:${userId}`);

  return hash % 100;
}