import { pgTable, text, timestamp, boolean, json, integer } from "drizzle-orm/pg-core";

export const repos = pgTable('repos', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id').notNull(),
	repoId: integer('repo_id').notNull(),
	repoName: text('repo_name').notNull(),
	repoUrl: text('repo_url').notNull(),
	languagesUrl: text('languages_url').notNull(),
	owner: text('owner').notNull(),
	repoSlug: text('repo_slug').notNull(),
	isPrivate: boolean('is_private').notNull().default(false),
	name: text('name').notNull(),
	tagline: text('tagline').notNull(),
	description: text('description'),
	techStack: text('tech_stack').notNull(),
	thumbnail: text('thumbnail'),
	contact: json('contact'),
	lookingForRoles: json('looking_for_roles'),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export * from './auth.schema';
