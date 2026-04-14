import express from "express";
import cors from "cors";

import { migrate } from "./db/migrate.js";
import { seedIfEmpty } from "./db/seed.js";
import companiesRouter from "./routes/companies.js";
import dealsRouter from "./routes/deals.js";
import peopleRouter from "./routes/people.js";
import meetingsRouter from "./routes/meetings.js";
import memosRouter from "./routes/memos.js";
import thesesRouter from "./routes/theses.js";
import tasksRouter from "./routes/tasks.js";
import fundsRouter from "./routes/funds.js";
import pipelineRouter from "./routes/pipeline.js";
import searchRouter from "./routes/search.js";
import activityRouter from "./routes/activity.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startedAt;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });

  next();
});

app.use(
  cors({
    origin: ["http://localhost:1420", "http://localhost:5173"],
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", companiesRouter);
app.use("/api", dealsRouter);
app.use("/api", peopleRouter);
app.use("/api", meetingsRouter);
app.use("/api", memosRouter);
app.use("/api", thesesRouter);
app.use("/api", tasksRouter);
app.use("/api", fundsRouter);
app.use("/api", pipelineRouter);
app.use("/api", searchRouter);
app.use("/api", activityRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({
    error: error instanceof Error ? error.message : "Unknown server error",
  });
});

migrate();
seedIfEmpty();

app.listen(PORT, () => {
  console.log(`Neuralyn API running on :${PORT}`);
});
