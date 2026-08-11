
import { jsonb } from "drizzle-orm/pg-core";
import { integer, pgTable, boolean, serial, text, timestamp } from "drizzle-orm/pg-core";
import { Rule } from "../types/flag.types";
import { unique } from "drizzle-orm/pg-core";



// Organizations Table

export const organizations = pgTable("organizations", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdBy: integer("created_by").notNull().references(() => users.id, {
        onDelete: "restrict", onUpdate: "cascade"
    }) ,
    createdAt: timestamp("created_at").defaultNow(),
})

// Users Table

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),  
  createdAt: timestamp("created_at").defaultNow(),
});

// Membership Table

export const members = pgTable("members", {
    id: serial("id").primaryKey(),
    userID: integer("user_id").notNull().references(() => users.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),
    organizationID: integer("organization_id").notNull().references(() => organizations.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),
    role: text("role"),
    joinedAt: timestamp("joined_at").defaultNow()
})

// Projects Table

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    organizationID: integer("organization_id").notNull().references(() => organizations.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),
    createdAt: timestamp("created_at").defaultNow(),
    createdBy: integer("created_by").notNull().references(() => users.id, {
        onDelete: "restrict", onUpdate: "cascade"
    })
})


// Flags Table

export const flags = pgTable("flags", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),

    type: text("type").notNull().default("release"),

    projectID: integer("project_id").notNull().references(() => projects.id , {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    createdAt: timestamp("created_at").defaultNow(),
    createdBy: integer("created_by").notNull().references(() => users.id, {
        onDelete: "no action", onUpdate: "cascade"
    }),
    updatedAt: timestamp("updated_at").defaultNow(),
})


// Environment Flag Configs


export const environmentFlagConfig = pgTable("environment_flag_config", {
    id: serial("id").primaryKey(),
    
    flagID: integer("flag_id").notNull().references(() => flags.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    environment: text("environment").notNull(),

    enabled: boolean("enabled").notNull().default(false),
    status: text("status").notNull().default("draft"),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Audit Logs Table

export const auditLogs = pgTable("audit_logs", {
    id: serial("id").primaryKey(),

    projectID: integer("project_id").notNull().references(() => projects.id, {
        onDelete: "no action", onUpdate: "cascade"
    }),
    actorUserID: integer("actor_user_id").notNull().references(() => users.id, {
        onDelete: "no action", onUpdate: "cascade"
    }),

    action: text("action").notNull(),

    resourceType: text("resource_type").notNull(),
    resourceID: integer("resource_id").notNull(),
    resourceName: text("resource_name"),
    
    oldData: jsonb("old_data").$type<Record<string, any>>(),
    newData: jsonb("new_data").$type<Record<string, any>>(),

})

// Flag Targets Table
// flag target is just simply rules and variants combined for targeted people

export const flagTargets = pgTable("flag_targets", {
    id: serial("id").primaryKey(),

    flagID: integer("flag_id").references(() => flags.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    targetType: text("target_type"),
    targetValue: integer("target_value"),

    variantID: integer("variant_id").references(() => flagVariants.id, {
        onDelete: "cascade", onUpdate: "cascade"
    })
})

// Flag Variants Table

export const flagVariants = pgTable("flag_variants", {
    id: serial("id").primaryKey(),

    flagID: integer("flag_id").references(() => flags.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    name: text("name").notNull(),
    value: jsonb("value").$type<Record<string, any>>()

}, (table) => [
    unique("flag_id_key").on(
        table.flagID, table.name
    )
] )

// Flag Rules Table

export const flagRules = pgTable("flag_rules", {
    id: serial("id").primaryKey(),

    envFlagConfigID: integer("env_flag_config_id").references(() => environmentFlagConfig.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    name: text("name").notNull(),
    conditions: jsonb("conditions").$type<Record<string, any>>(),

    // Variant not null only if rule has simple 100% rollout and evaluation ends here. For rollout 
    // values which are distributed it is null and evaluated through rollouts.

    variantID: integer("variant_id").references(() => flagVariants.id, {
        onDelete: "restrict", onUpdate: "cascade"
    })
})

// Flag Rollouts Table

export const flagRollouts = pgTable("flag_rollouts", {
    id: serial("id").primaryKey(),

    // Rollout is on  users who qualify rules not on whole flag users

    ruleID: integer("rule_id").references(() => flagRules.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    percentage: integer("percentage").default(100),

    variantID: integer("variant_id").references(() => flagVariants.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    bucketBy: text("bucket_by")

})

// Flag Evaluation Table

export const flagEvaluation = pgTable("flag_evaluation", {
    id: serial("id").primaryKey(),

    flagID: integer("flag_id").references(() => flags.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    entityType: text("entity_type"),
    entityID: integer("entity_id"),

    position: integer("position"),

})

// Incoming Events Table

export const events = pgTable("events", {
    id: serial("id").primaryKey(),

    key: text("key"),

    flagEnvironmentID: integer("flag_environment_id").references(() => environmentFlagConfig.id, {
        onDelete: "no action", onUpdate: "cascade"
    }),
    
    eventType: text("event_type"),
    
    // unique
    service: text("service"),

    createdAt: timestamp("created_at").defaultNow()

})

// Automation Rules

export const automationActions = pgTable("automation_actions", {
    id: serial("id").primaryKey(),

    // name

    name: text("name"),

    // desc

    description: text("description"),

    // (flag env id and service) is unique

    flagEnvironmentID: integer("flag_environment_id").references(() => environmentFlagConfig.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    service: text("service"),

    // threshold at which flag will be disabled

    errorThreshold: integer("error_threshold").notNull(),

    // action to be performed

    action: text("action").default("turn_off")

})
