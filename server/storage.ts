import {
  users,
  gameCategories,
  gameScores,
  userAchievements,
  type User,
  type InsertUser,
  type GameCategory,
  type InsertGameCategory,
  type GameScore,
  type InsertGameScore,
  type UserAchievement,
  type InsertUserAchievement,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations for custom auth
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  // Game category operations
  getGameCategories(): Promise<GameCategory[]>;
  createGameCategory(category: InsertGameCategory): Promise<GameCategory>;
  
  // Game score operations
  getUserScores(userId: string): Promise<GameScore[]>;
  createGameScore(score: InsertGameScore): Promise<GameScore>;
  getUserBestScores(userId: string): Promise<GameScore[]>;
  
  // User achievement operations
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement>;
  
  // User statistics
  getUserStats(userId: string): Promise<{
    totalGamesPlayed: number;
    totalTimeSpent: number;
    currentStreak: number;
    totalBadges: number;
    globalRank: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations for custom auth
  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Game category operations
  async getGameCategories(): Promise<GameCategory[]> {
    return await db.select().from(gameCategories);
  }

  async createGameCategory(category: InsertGameCategory): Promise<GameCategory> {
    const [newCategory] = await db
      .insert(gameCategories)
      .values(category)
      .returning();
    return newCategory;
  }

  // Game score operations
  async getUserScores(userId: string): Promise<GameScore[]> {
    return await db
      .select()
      .from(gameScores)
      .where(eq(gameScores.userId, userId))
      .orderBy(desc(gameScores.completedAt));
  }

  async createGameScore(score: InsertGameScore): Promise<GameScore> {
    const [newScore] = await db
      .insert(gameScores)
      .values(score)
      .returning();
    return newScore;
  }

  async getUserBestScores(userId: string): Promise<GameScore[]> {
    return await db
      .select()
      .from(gameScores)
      .where(eq(gameScores.userId, userId))
      .orderBy(desc(gameScores.score))
      .limit(10);
  }

  // User achievement operations
  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.earnedAt));
  }

  async createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement> {
    const [newAchievement] = await db
      .insert(userAchievements)
      .values(achievement)
      .returning();
    return newAchievement;
  }

  // User statistics
  async getUserStats(userId: string): Promise<{
    totalGamesPlayed: number;
    totalTimeSpent: number;
    currentStreak: number;
    totalBadges: number;
    globalRank: number;
  }> {
    // Get total games played
    const [gamesResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(gameScores)
      .where(eq(gameScores.userId, userId));

    // Get total time spent
    const [timeResult] = await db
      .select({ total: sql<number>`sum(${gameScores.timeCompleted})` })
      .from(gameScores)
      .where(eq(gameScores.userId, userId));

    // Get current streak (simplified - days with games played)
    const [streakResult] = await db
      .select({ count: sql<number>`count(distinct date(${gameScores.completedAt}))` })
      .from(gameScores)
      .where(and(
        eq(gameScores.userId, userId),
        sql`${gameScores.completedAt} >= current_date - interval '30 days'`
      ));

    // Get total badges
    const [badgesResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));

    // Calculate global rank (simplified - based on total score)
    const [rankResult] = await db
      .select({ rank: sql<number>`row_number() over (order by sum(score) desc)` })
      .from(gameScores)
      .where(eq(gameScores.userId, userId));

    return {
      totalGamesPlayed: gamesResult?.count || 0,
      totalTimeSpent: timeResult?.total || 0,
      currentStreak: streakResult?.count || 0,
      totalBadges: badgesResult?.count || 0,
      globalRank: rankResult?.rank || 999,
    };
  }
}

export const storage = new DatabaseStorage();
