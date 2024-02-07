ALTER TABLE "subscriptions" ALTER COLUMN "last_event_date" SET DEFAULT -1;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "last_event_date" DROP NOT NULL;