import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Environmental data endpoints
  app.get("/api/climate", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = await storage.getClimateData();
    res.json(data);
  });

  app.get("/api/infrastructure", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = await storage.getInfrastructureData();
    res.json(data);
  });

  app.get("/api/algae", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = await storage.getAlgaeData();
    res.json(data);
  });

  app.get("/api/urban", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = await storage.getUrbanData();
    res.json(data);
  });

  const httpServer = createServer(app);
  return httpServer;
}
