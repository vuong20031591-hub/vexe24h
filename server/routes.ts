import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRouteSchema, insertPromotionSchema, insertNewsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/routes", async (_req, res) => {
    try {
      const routes = await storage.getAllRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch routes" });
    }
  });

  app.get("/api/routes/:id", async (req, res) => {
    try {
      const route = await storage.getRoute(req.params.id);
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch route" });
    }
  });

  app.post("/api/routes", async (req, res) => {
    try {
      const validatedData = insertRouteSchema.parse(req.body);
      const route = await storage.createRoute(validatedData);
      res.status(201).json(route);
    } catch (error) {
      res.status(400).json({ error: "Invalid route data" });
    }
  });

  app.get("/api/promotions", async (_req, res) => {
    try {
      const promotions = await storage.getAllPromotions();
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch promotions" });
    }
  });

  app.get("/api/promotions/:id", async (req, res) => {
    try {
      const promotion = await storage.getPromotion(req.params.id);
      if (!promotion) {
        return res.status(404).json({ error: "Promotion not found" });
      }
      res.json(promotion);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch promotion" });
    }
  });

  app.post("/api/promotions", async (req, res) => {
    try {
      const validatedData = insertPromotionSchema.parse(req.body);
      const promotion = await storage.createPromotion(validatedData);
      res.status(201).json(promotion);
    } catch (error) {
      res.status(400).json({ error: "Invalid promotion data" });
    }
  });

  app.get("/api/news", async (_req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const newsItem = await storage.getNewsItem(req.params.id);
      if (!newsItem) {
        return res.status(404).json({ error: "News item not found" });
      }
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news item" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(validatedData);
      res.status(201).json(news);
    } catch (error) {
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
