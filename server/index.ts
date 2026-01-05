import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleEnquiry } from "./routes/enquiry";

// Load env files in order: .env, then .env.local (override) so local secrets are picked up during dev
dotenv.config();
dotenv.config({ path: ".env.local", override: true });

export function createServer() {
  const app = express();

  // Debug: print whether important env vars are loaded (RESEND_API_KEY is hidden)
  console.log("Enquiry email config:", {
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
    COMPANY_EMAIL: process.env.COMPANY_EMAIL || "NOT SET",
  });

  // Middleware
  app.use(cors());
  
  // Debug: log all incoming requests
  app.use((req, res, next) => {
    console.log("Incoming request:", {
      method: req.method,
      path: req.path,
      contentType: req.get("content-type"),
      body: req.body,
      rawBody: req.rawBody,
    });
    next();
  });
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Enquiry route
  app.post("/api/send-enquiry", handleEnquiry);

  return app;
}
