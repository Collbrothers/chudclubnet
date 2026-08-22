CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`steam_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`steam_id`) REFERENCES `users`(`steam_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`steam_id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`accepted` integer DEFAULT false NOT NULL,
	`is_admin` integer DEFAULT false NOT NULL,
	`quote` text,
	`description` text,
	`createdAt` text NOT NULL
);
