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

  // Enhanced mock environmental data methods with more realistic variations
  async getClimateData(): Promise<ClimateData> {
    // Simulate daily temperature cycle
    const hour = new Date().getHours();
    const baseTemp = 20 + (Math.sin((hour - 6) * Math.PI / 12) * 5);

    return {
      temperature: baseTemp + (Math.random() * 2 - 1),
      humidity: 50 + Math.sin(hour * Math.PI / 12) * 20 + (Math.random() * 5),
      airQuality: 80 + Math.sin(hour * Math.PI / 12) * 10 + (Math.random() * 5),
      timestamp: new Date(),
    };
  }

  async getInfrastructureData(): Promise<InfrastructureData[]> {
    const getRandomStatus = () => {
      const rand = Math.random();
      return rand > 0.8 ? "critical" : rand > 0.6 ? "warning" : "good";
    };

    return [
      {
        status: getRandomStatus(),
        type: "Solar Panels",
        location: "Central District",
        lastUpdate: new Date(),
        metrics: {
          efficiency: 85 + (Math.random() * 10),
          maintenance: "Scheduled",
          lastIncident: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        },
      },
      {
        status: getRandomStatus(),
        type: "Water Treatment",
        location: "North Zone",
        lastUpdate: new Date(),
        metrics: {
          efficiency: 92 + (Math.random() * 5),
          maintenance: "Up-to-date",
        },
      },
      {
        status: getRandomStatus(),
        type: "Wind Turbines",
        location: "Coastal Area",
        lastUpdate: new Date(),
        metrics: {
          efficiency: 78 + (Math.random() * 15),
          maintenance: "Pending",
          lastIncident: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      },
    ];
  }

  async getAlgaeData(): Promise<AlgaeData> {
    const hour = new Date().getHours();
    const baseRisk = 50 + Math.sin(hour * Math.PI / 12) * 30;

    return {
      riskLevel: baseRisk + (Math.random() * 10),
      location: "City Lake",
      nutrients: 45 + (Math.random() * 10),
      temperature: 22 + (Math.random() * 5),
      timestamp: new Date(),
      trend: Math.random() > 0.6 ? "increasing" : Math.random() > 0.3 ? "stable" : "decreasing",
    };
  }

  async getUrbanData(): Promise<UrbanData> {
    const generateAlerts = () => {
      const alerts = [];
      if (Math.random() > 0.7) {
        alerts.push({
          type: "Water Usage",
          message: "Water consumption above weekly average",
          severity: "warning",
        });
      }
      if (Math.random() > 0.8) {
        alerts.push({
          type: "Energy Grid",
          message: "Peak load detected in commercial district",
          severity: "info",
        });
      }
      return alerts;
    };

    return {
      greenSpacePercent: 35 + (Math.random() * 10),
      sustainabilityScore: 75 + (Math.random() * 15),
      energyEfficiency: 80 + (Math.random() * 10),
      waterManagement: 70 + (Math.random() * 15),
      timestamp: new Date(),
      alerts: generateAlerts(),
    };
  }
}

export const storage = new MemStorage();