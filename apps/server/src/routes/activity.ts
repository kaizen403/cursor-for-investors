import { Router } from "express";

import { db } from "../db/index.js";

const router = Router();

router.get("/activity", (req, res) => {
  const limit = Number(req.query.limit ?? 50);
  const activity = [
    ...((db
      .prepare("SELECT id, name, createdAt, updatedAt FROM companies")
      .all() as Array<{ id: string; name: string; createdAt: string; updatedAt: string }>)
      .map((item) => ({
        entityType: "company",
        entityId: item.id,
        entityName: item.name,
        action: item.createdAt === item.updatedAt ? "created" : "updated",
        timestamp: item.updatedAt,
      }))),
    ...((db
      .prepare(
        `SELECT d.id, c.name as name, d.createdAt, d.updatedAt
         FROM deals d
         JOIN companies c ON c.id = d.companyId`,
      )
      .all() as Array<{ id: string; name: string; createdAt: string; updatedAt: string }>)
      .map((item) => ({
        entityType: "deal",
        entityId: item.id,
        entityName: item.name,
        action: item.createdAt === item.updatedAt ? "created" : "updated",
        timestamp: item.updatedAt,
      }))),
    ...((db
      .prepare("SELECT id, title as name, createdAt, completedAt FROM tasks")
      .all() as Array<{ id: string; name: string; createdAt: string; completedAt: string | null }>)
      .map((item) => ({
        entityType: "task",
        entityId: item.id,
        entityName: item.name,
        action: item.completedAt ? "updated" : "created",
        timestamp: item.completedAt ?? item.createdAt,
      }))),
    ...((db
      .prepare("SELECT id, title as name, createdAt, updatedAt FROM memos")
      .all() as Array<{ id: string; name: string; createdAt: string; updatedAt: string }>)
      .map((item) => ({
        entityType: "memo",
        entityId: item.id,
        entityName: item.name,
        action: item.createdAt === item.updatedAt ? "created" : "updated",
        timestamp: item.updatedAt,
      }))),
    ...((db
      .prepare("SELECT id, meetingType as name, createdAt FROM meetings")
      .all() as Array<{ id: string; name: string; createdAt: string }>)
      .map((item) => ({
        entityType: "meeting",
        entityId: item.id,
        entityName: item.name,
        action: "created",
        timestamp: item.createdAt,
      }))),
  ]
    .sort((left, right) => right.timestamp.localeCompare(left.timestamp))
    .slice(0, limit);

  res.json(activity);
});

export default router;
