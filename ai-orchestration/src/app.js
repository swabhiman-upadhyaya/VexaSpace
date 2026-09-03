/**
 * To create give the api key through cmd line
 * kubectl create secret generic ai-secret `
 * --from-literal=MISTRAL_API_KEY="**********"
 */

import express from "express"
import morgan from "morgan"

import agentRouter from "./routes/agent.routes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes

app.get("/api/status/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/ai/agent", agentRouter)

export default app;