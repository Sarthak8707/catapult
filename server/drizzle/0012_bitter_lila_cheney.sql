CREATE TABLE "environment_flag_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"flag_id" integer NOT NULL,
	"environment" text NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "environments" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "environments" CASCADE;--> statement-breakpoint
ALTER TABLE "flag_rules" DROP CONSTRAINT "flag_rules_flag_id_flags_id_fk";
--> statement-breakpoint
ALTER TABLE "flags" DROP CONSTRAINT "flags_environment_id_environments_id_fk";
--> statement-breakpoint
ALTER TABLE "flag_rules" ADD COLUMN "env_flag_config_id" integer;--> statement-breakpoint
ALTER TABLE "flags" ADD COLUMN "type" text DEFAULT 'release' NOT NULL;--> statement-breakpoint
ALTER TABLE "flags" ADD COLUMN "project_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "environment_flag_config" ADD CONSTRAINT "environment_flag_config_flag_id_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."flags"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_rules" ADD CONSTRAINT "flag_rules_env_flag_config_id_environment_flag_config_id_fk" FOREIGN KEY ("env_flag_config_id") REFERENCES "public"."environment_flag_config"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flags" ADD CONSTRAINT "flags_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_rules" DROP COLUMN "flag_id";--> statement-breakpoint
ALTER TABLE "flags" DROP COLUMN "enabled";--> statement-breakpoint
ALTER TABLE "flags" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "flags" DROP COLUMN "environment_id";