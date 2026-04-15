import { Context, Flag } from "../../types";
import { computeBucket } from "../hash";

export function evaluateRollout(flagKey: string, flag: Flag, context: Context) {
  const { userId } = context;

  if (!userId) return false;

  const bucket = computeBucket(flagKey, userId, "rollout");

  return bucket < flag.rolloutPercentage;
}