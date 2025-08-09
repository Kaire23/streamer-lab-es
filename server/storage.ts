import { generatedPosts, subscribers, emailQueue } from "@shared/schema";
import { db } from "@shared/db";
import { eq, and } from "drizzle-orm";

// Storage interface for all CRUD operations
export interface IStorage {
  // Generated posts
  getGeneratedPost(slug: string): Promise<any | undefined>;
  getAllGeneratedPosts(): Promise<any[]>;
  createGeneratedPost(post: any): Promise<any>;
  
  // Subscribers
  createSubscriber(subscriber: any): Promise<any>;
  getSubscriberByEmail(email: string): Promise<any | undefined>;
  
  // Email queue
  addToEmailQueue(item: any): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getGeneratedPost(slug: string) {
    const posts = await db.select().from(generatedPosts).where(eq(generatedPosts.slug, slug));
    return posts[0] || null;
  }

  async getAllGeneratedPosts() {
    const posts = await db.select().from(generatedPosts).where(eq(generatedPosts.isPublished, true));
    return posts.map((post: any) => ({
      ...post,
      published_at: post.publishedAt,
      reading_time: post.readingTime,
      created_at: post.createdAt,
      is_published: post.isPublished
    }));
  }

  async createGeneratedPost(post: any) {
    const result = await db.insert(generatedPosts).values(post).returning();
    return result[0];
  }

  async createSubscriber(subscriber: any) {
    const result = await db.insert(subscribers).values(subscriber).returning();
    return result[0];
  }

  async getSubscriberByEmail(email: string) {
    const subs = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subs[0] || null;
  }

  async addToEmailQueue(item: any) {
    const result = await db.insert(emailQueue).values(item).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
