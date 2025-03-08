import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Mock sensor data endpoints
  app.get("/api/climate-data", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const data = {
      temperature: 23.5,
      humidity: 65,
      airQuality: 85,
      co2Levels: 412,
      timestamps: Array.from({length: 24}, (_, i) => new Date(Date.now() - i * 3600000).toISOString())
    };
    res.json(data);
  });

  app.get("/api/infrastructure", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const data = {
      resilience: 87,
      vulnerableAreas: 3,
      criticalPoints: 1,
      lastUpdated: new Date().toISOString()
    };
    res.json(data);
  });

  app.get("/api/algae-risk", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const data = {
      riskLevel: "moderate",
      probability: 35,
      affectedAreas: ["Lake District", "River Delta"],
      predictions: Array.from({length: 7}, (_, i) => ({
        date: new Date(Date.now() + i * 86400000).toISOString(),
        risk: Math.random() * 100
      }))
    };
    res.json(data);
  });

  app.get("/api/urban-metrics", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const data = {
      greenSpacePercent: 28,
      sustainabilityScore: 72,
      energyEfficiency: 81,
      recommendations: [
        "Increase urban tree coverage",
        "Implement rain gardens",
        "Expand bicycle infrastructure"
      ]
    };
    res.json(data);
  });

  const httpServer = createServer(app);
  return httpServer;
}
