CREATE TABLE "flag_evaluation" (
	"id" serial PRIMARY KEY NOT NULL,
	"flag_id" integer,
	"entity_type" text,
	"entity_id" integer,
	"position" integer
);
--> statement-breakpoint
CREATE TABLE "flag_rollouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"rule_id" integer,
	"percentage" integer DEFAULT 100,
	"variant_id" integer,
	"bucket_by" text
);
--> statement-breakpoint
CREATE TABLE "flag_rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"flag_id" integer,
	"name" text NOT NULL,
	"conditions" jsonb,
	"variant_id" integer
);
--> statement-breakpoint
CREATE TABLE "flag_targets" (
	"id" serial PRIMARY KEY NOT NULL,
	"flag_id" integer,
	"target_type" text,
	"target_value" integer,
	"variant_id" integer
);
--> statement-breakpoint
CREATE TABLE "flag_variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"flag_id" integer,
	"name" text NOT NULL,
	"value" jsonb,
	CONSTRAINT "flag_id_key" UNIQUE("flag_id","name")
);
--> statement-breakpoint
ALTER TABLE "flags" ADD COLUMN "created_by" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "flags" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "flag_evaluation" ADD CONSTRAINT "flag_evaluation_flag_id_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."flags"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_rollouts" ADD CONSTRAINT "flag_rollouts_rule_id_flag_rules_id_fk" FOREIGN KEY ("rule_id") REFERENCES "public"."flag_rules"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_rollouts" ADD CONSTRAINT "flag_rollouts_variant_id_flag_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."flag_variants"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_rules" ADD CONSTRAINT "flag_rules_flag_id_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."flags"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_rules" ADD CONSTRAINT "flag_rules_variant_id_flag_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."flag_variants"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_targets" ADD CONSTRAINT "flag_targets_flag_id_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."flags"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_targets" ADD CONSTRAINT "flag_targets_variant_id_flag_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."flag_variants"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flag_variants" ADD CONSTRAINT "flag_variants_flag_id_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."flags"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flags" ADD CONSTRAINT "flags_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "flags" DROP COLUMN "rollout_percentage";--> statement-breakpoint
ALTER TABLE "flags" DROP COLUMN "rules";