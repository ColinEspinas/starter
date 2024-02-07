CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_id" text NOT NULL,
	"customer" text NOT NULL,
	"status" text NOT NULL,
	"start_date" numeric NOT NULL,
	"end_date" numeric NOT NULL,
	"last_event_date" numeric NOT NULL
);
