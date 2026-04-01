
import { integer, pgTable, boolean, serial, text, timestamp } from "drizzle-orm/pg-core";



// Organizations Table

export const organizations = pgTable("organizations", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
})

// Users Table

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  organizationID: integer("organization_id").notNull().references(() => organizations.id, {
    onDelete: "cascade", onUpdate: "cascade"
  }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Projects Table

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    organizationID: integer("organization_id").notNull().references(() => organizations.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),
    createdAt: timestamp("created_at").defaultNow()
})

// Environments Table

export const environments = pgTable("environments", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    projectID: integer("project_id").notNull().references(() => projects.id, {
        onDelete: "cascade", onUpdate: "cascade"
    }),
    createdAt: timestamp("created_at").defaultNow();
})

// Flags Table

export const flags = pgTable("flags", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    enabled: boolean("enabled").notNull(),
    environmentID: integer("environment_id").notNull().references(() => environments.id , {
        onDelete: "cascade", onUpdate: "cascade"
    }),
    createdAt: timestamp("created_at").defaultNow();
})