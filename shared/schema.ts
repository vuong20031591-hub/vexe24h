import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const routes = pgTable("routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  from: text("from").notNull(),
  to: text("to").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
});

export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Route = typeof routes.$inferSelect;

export const promotions = pgTable("promotions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});

export const insertPromotionSchema = createInsertSchema(promotions).omit({
  id: true,
});

export type InsertPromotion = z.infer<typeof insertPromotionSchema>;
export type Promotion = typeof promotions.$inferSelect;

export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  image: text("image").notNull(),
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
});

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
