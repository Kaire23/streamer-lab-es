import { pgTable, text, serial, varchar, integer, timestamp, boolean, json, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Subscribers table for email notifications
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
  unsubscribeToken: varchar("unsubscribe_token", { length: 255 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

// Generated posts table for automated SEO content
export const generatedPosts = pgTable("generated_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: varchar("cover_image", { length: 500 }),
  keywords: json("keywords").$type<string[]>().notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  author: varchar("author", { length: 255 }).notNull().default("Equipo Setups de Streamers"),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isPublished: boolean("is_published").notNull().default(false),
  readingTime: integer("reading_time").notNull().default(5),
  priority: varchar("priority", { length: 20 }).notNull().default("high"),
});

// Email queue for sending notifications
export const emailQueue = pgTable("email_queue", {
  id: serial("id").primaryKey(),
  subscriberId: integer("subscriber_id").notNull().references(() => subscribers.id),
  postId: integer("post_id").notNull().references(() => generatedPosts.id),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const subscribersRelations = relations(subscribers, ({ many }) => ({
  emailQueue: many(emailQueue),
}));

export const generatedPostsRelations = relations(generatedPosts, ({ many }) => ({
  emailQueue: many(emailQueue),
}));

export const emailQueueRelations = relations(emailQueue, ({ one }) => ({
  subscriber: one(subscribers, {
    fields: [emailQueue.subscriberId],
    references: [subscribers.id],
  }),
  post: one(generatedPosts, {
    fields: [emailQueue.postId],
    references: [generatedPosts.id],
  }),
}));

// Schemas
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  subscribedAt: true,
});

export const insertGeneratedPostSchema = createInsertSchema(generatedPosts).omit({
  id: true,
  createdAt: true,
});

export const insertEmailQueueSchema = createInsertSchema(emailQueue).omit({
  id: true,
  createdAt: true,
});

// Types
export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

export type GeneratedPost = typeof generatedPosts.$inferSelect;
export type InsertGeneratedPost = z.infer<typeof insertGeneratedPostSchema>;

export type EmailQueue = typeof emailQueue.$inferSelect;
export type InsertEmailQueue = z.infer<typeof insertEmailQueueSchema>;