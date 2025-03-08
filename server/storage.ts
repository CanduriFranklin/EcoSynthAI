import { User, InsertUser, ClimateData, InfrastructureData, AlgaeData, UrbanData } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  sessionStore: session.Store;
  
  // Environmental data methods
  getClimateData(): Promise<ClimateData>;
  getInfrastructureData(): Promise<InfrastructureData[]>;
  getAlgaeData(): Promise<AlgaeData>;
  getUrbanData(): Promise<UrbanData>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  sessionStore: session.Store;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Mock environmental data methods
  async getClimateData(): Promise<ClimateData> {
    return {
      temperature: 25 + Math.random() * 5,
      humidity: 50 + Math.random() * 20,
      airQuality: 80 + Math.random() * 20,
      timestamp: new Date(),
    };
  }

  async getInfrastructureData(): Promise<InfrastructureData[]> {
    return [
      {
        status: "good",
        type: "Solar Panels",
        location: "Central District",
        lastUpdate: new Date(),
      },
      {
        status: "warning",
        type: "Water Treatment",
        location: "North Zone",
        lastUpdate: new Date(),
      },
      {
        status: "critical",
        type: "Wind Turbines",
        location: "Coastal Area",
        lastUpdate: new Date(),
      },
    ];
  }

  async getAlgaeData(): Promise<AlgaeData> {
    return {
      riskLevel: Math.random() * 100,
      location: "City Lake",
      nutrients: 45 + Math.random() * 10,
      temperature: 22 + Math.random() * 5,
    };
  }

  async getUrbanData(): Promise<UrbanData> {
    return {
      greenSpacePercent: 35 + Math.random() * 10,
      sustainabilityScore: 75 + Math.random() * 15,
      energyEfficiency: 80 + Math.random() * 10,
      waterManagement: 70 + Math.random() * 15,
    };
  }
}

export const storage = new MemStorage();
