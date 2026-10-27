import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { environmentFlagConfig, flagRollouts, flagRules, flags, flagVariants, projects, ruleSegments, segments } from "../db/schema"
import { getFlagInfoService } from "./featureFlag.service"



export const getSDKFlagsService = async (projectID: number) => {
  try {
    const data = await db
      .select({
        flagID: flags.id,
        flagName: flags.name,
        flagKey: flags.key,
        flagType: flags.type,

        configID: environmentFlagConfig.id,
        environment: environmentFlagConfig.environment,
        enabled: environmentFlagConfig.enabled,

        ruleID: flagRules.id,
        ruleName: flagRules.name,
        conditions: flagRules.conditions,

        rolloutID: flagRollouts.id,
        percentage: flagRollouts.percentage,

        variantID: flagVariants.id,
        variantName: flagVariants.name,
        variantValue: flagVariants.value,

        ruleSegID: ruleSegments.id,
        segmentID: segments.id,
        segmentName: segments.name,
        segmentData: segments.conditions
      })
      .from(flags)
      .leftJoin(
        environmentFlagConfig,
        eq(environmentFlagConfig.flagID, flags.id)
      )
      .leftJoin(
        flagRules,
        eq(flagRules.envFlagConfigID, environmentFlagConfig.id)
      )
      .leftJoin(
        flagRollouts,
        eq(flagRollouts.ruleID, flagRules.id)
      )
      .leftJoin(
        flagVariants,
        eq(flagVariants.id, flagRollouts.variantID)
      )
      .leftJoin(
        ruleSegments,
        eq(ruleSegments.ruleID, flagRules.id)
      )
      .leftJoin(
        segments,
        eq(segments.id, ruleSegments.segmentID)
      )
      .where(eq(flags.projectID, projectID));

    // Group by flag
    const groupedByFlag = new Map<number, any>();

    for (const row of data) {
      // Create flag
      if (!groupedByFlag.has(row.flagID)) {
        groupedByFlag.set(row.flagID, {
          flagID: row.flagID,
          flagName: row.flagName,
          flagKey: row.flagKey,
          flagType: row.flagType,

          // Map<configID, config>
          configs: new Map<number, any>(),
        });
      }

      const flag = groupedByFlag.get(row.flagID);

      // Create environment config
      if (row.configID !== null && !flag.configs.has(row.configID)) {
        flag.configs.set(row.configID, {
          configID: row.configID,
          environment: row.environment,
          enabled: row.enabled,

          // Map<ruleID, rule>
          rules: new Map<number, any>(),
        });
      }

      // No config
      if (row.configID === null) continue;

      const config = flag.configs.get(row.configID);

      // No rule
      if (row.ruleID === null) continue;

      // Create rule
      if (!config.rules.has(row.ruleID)) {
        config.rules.set(row.ruleID, {
          ruleID: row.ruleID,
          ruleName: row.ruleName,

          conditions: row.conditions,
          segments: [],

          rollouts: [],
        });
      }

      const rule = config.rules.get(row.ruleID);

      // Add segments
      if (row.segmentID !== null) {

        const exists = rule.segments.some(
          (segment: any) => segment.segmentID === row.segmentID
        );

        if (!exists) {
          rule.segments.push({
            segmentID: row.segmentID,
            segmentName: row.segmentName,
            segmentData: row.segmentData
          })
        }
      }


      // Add rollout only if it exists
      if (row.rolloutID !== null) {

        const exists = rule.rollouts.some(
          (rollout: any) => rollout.rolloutID === row.rolloutID
        )

        if (!exists) {
          config.rules.get(row.ruleID).rollouts.push({
            rolloutID: row.rolloutID,
            percentage: row.percentage,
            variantID: row.variantID,
            variantName: row.variantName,
            value: row.variantValue,
          });
        }
      }


    }

    // Convert Maps → arrays
    const result = [...groupedByFlag.values()].map((flag) => ({
      id: flag.flagID,
      name: flag.flagName,
      key: flag.flagKey,
      type: flag.flagType,

      environments: [...flag.configs.values()].map((config) => ({
        configID: config.configID,
        environment: config.environment,
        enabled: config.enabled,
        rules: [...config.rules.values()],
      })),
    }));

    return result;

  } catch (err) {
    console.log(err);
    throw err;
  }
};