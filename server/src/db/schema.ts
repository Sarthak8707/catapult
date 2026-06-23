
import { jsonb } from "drizzle-orm/pg-core";
import { integer, pgTable, boolean, serial, text, timestamp } from "drizzle-orm/pg-core";
import { Rule } from "../types/flag.types";



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

// Environments Table

export const environments = pgTable("environments", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    projectID: integer("project_id").notNull().references(() => projects.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),
    createdAt: timestamp("created_at").defaultNow()
})

// Flags Table

export const flags = pgTable("flags", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),

    enabled: boolean("enabled").notNull(),
    status: text("status").notNull().default("draft"),

    environmentID: integer("environment_id").notNull().references(() => environments.id , {
        onDelete: "cascade", onUpdate: "cascade"
    }),

    rolloutPercentage: integer("rollout_percentage").notNull().default(100),
    
    rules: jsonb('rules').$type<Rule[]>().notNull().default([]),

    createdAt: timestamp("created_at").defaultNow(),
})

// Audit Logs Table

export const auditLogs = pgTable("audit_logs", {
    id: serial("id").primaryKey(),

    organizationID: integer("organization_id").notNull().references(() => organizations.id, {
        onDelete: "no action", onUpdate: "cascade"
    }),
    projectID: integer("project_id").notNull().references(() => projects.id, {
        onDelete: "no action", onUpdate: "cascade"
    }),
    actorUserID: integer("actor_user_id").notNull().references(() => users.id, {
        onDelete: "no action", onUpdate: "cascade"
    }),

    action: text("action").notNull(),

    resourceType: text("resource_type").notNull(),
    resourceID: integer("resource_id").notNull(),
    
    oldData: jsonb("old_data").$type<Record<string, any>>(),
    newData: jsonb("new_data").$type<Record<string, any>>(),

})