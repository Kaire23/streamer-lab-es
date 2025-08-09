import type { Subscriber, InsertSubscriber, GeneratedPost, InsertGeneratedPost, EmailQueue, InsertEmailQueue } from "@shared/schema";
import { subscribers, generatedPosts, emailQueue } from "@shared/schema";
import { db } from "./db";
import { eq, and, lte, desc, isNull } from "drizzle-orm";

export interface IStorage {
  // Subscriber methods
  getSubscriber(email: string): Promise<Subscriber | undefined>;
  createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber>;
  unsubscribeByToken(token: string): Promise<boolean>;
  getAllActiveSubscribers(): Promise<Subscriber[]>;
  
  // Generated posts methods
  getPublishedPosts(): Promise<GeneratedPost[]>;
  getAllGeneratedPosts(): Promise<GeneratedPost[]>;
  getGeneratedPost(slug: string): Promise<GeneratedPost | undefined>;
  createGeneratedPost(insertPost: InsertGeneratedPost): Promise<GeneratedPost>;
  getPostsToPublish(): Promise<GeneratedPost[]>;
  publishPost(id: number): Promise<void>;
  
  // Email queue methods
  addToEmailQueue(insertEmailQueue: InsertEmailQueue): Promise<EmailQueue>;
  getPendingEmails(): Promise<EmailQueue[]>;
  markEmailAsSent(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Subscriber methods
  async getSubscriber(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subscriber || undefined;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db
      .insert(subscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }

  async unsubscribeByToken(token: string): Promise<boolean> {
    const result = await db
      .update(subscribers)
      .set({ isActive: false })
      .where(eq(subscribers.unsubscribeToken, token))
      .returning();
    return result.length > 0;
  }

  async getAllActiveSubscribers(): Promise<Subscriber[]> {
    return await db.select().from(subscribers).where(eq(subscribers.isActive, true));
  }

  // Generated posts methods
  async getPublishedPosts(): Promise<GeneratedPost[]> {
    return await db
      .select()
      .from(generatedPosts)
      .where(
        and(
          eq(generatedPosts.isPublished, true),
          lte(generatedPosts.publishedAt, new Date())
        )
      )
      .orderBy(desc(generatedPosts.publishedAt));
  }

  async getAllGeneratedPosts(): Promise<GeneratedPost[]> {
    return await db
      .select()
      .from(generatedPosts)
      .orderBy(desc(generatedPosts.createdAt));
  }

  async getGeneratedPost(slug: string): Promise<GeneratedPost | undefined> {
    const [post] = await db
      .select()
      .from(generatedPosts)
      .where(eq(generatedPosts.slug, slug));
    return post || undefined;
  }

  async createGeneratedPost(insertPost: InsertGeneratedPost): Promise<GeneratedPost> {
    const [post] = await db
      .insert(generatedPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async getPostsToPublish(): Promise<GeneratedPost[]> {
    const now = new Date();
    return await db
      .select()
      .from(generatedPosts)
      .where(
        and(
          eq(generatedPosts.isPublished, false),
          lte(generatedPosts.publishedAt, now)
        )
      );
  }

  async publishPost(id: number): Promise<void> {
    await db
      .update(generatedPosts)
      .set({ isPublished: true })
      .where(eq(generatedPosts.id, id));
  }

  // Email queue methods
  async addToEmailQueue(insertEmailQueue: InsertEmailQueue): Promise<EmailQueue> {
    const [email] = await db
      .insert(emailQueue)
      .values(insertEmailQueue)
      .returning();
    return email;
  }

  async getPendingEmails(): Promise<EmailQueue[]> {
    return await db
      .select()
      .from(emailQueue)
      .where(isNull(emailQueue.sentAt));
  }

  async markEmailAsSent(id: number): Promise<void> {
    await db
      .update(emailQueue)
      .set({ sentAt: new Date() })
      .where(eq(emailQueue.id, id));
  }
}

export const storage = new DatabaseStorage();