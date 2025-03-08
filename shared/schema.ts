import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Environmental data types for type safety
export interface ClimateData {
  temperature: number;
  humidity: number;
  airQuality: number;
  timestamp: Date;
}

export interface InfrastructureData {
  status: "good" | "warning" | "critical";
  type: string;
  location: string;
  lastUpdate: Date;
}

export interface AlgaeData {
  riskLevel: number;
  location: string;
  nutrients: number;
  temperature: number;
}

export interface UrbanData {
  greenSpacePercent: number;
  sustainabilityScore: number;
  energyEfficiency: number;
  waterManagement: number;
}
