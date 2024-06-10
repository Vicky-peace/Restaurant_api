CREATE TABLE IF NOT EXISTS "webhook_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"event" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
