import murmurhash from "murmurhash";

export function computeBucket(userId: number, usecase: string) {
  const hash = murmurhash.v3(`${userId}:${usecase}`);

  return hash % 100;
}