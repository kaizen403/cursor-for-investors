import { Router } from "express";

import { db } from "../db/index.js";
import { parseJsonFields } from "../lib/utils.js";

const router = Router();

router.get("/pipeline/summary", (_req, res) => {
  const summary = {
    sourced: 0,
    first_call: 0,
    diligence: 0,
    ic: 0,
    term_sheet: 0,
    closed: 0,
    passed: 0,
  };

  const rows = db.prepare("SELECT stage, COUNT(*) as count FROM deals GROUP BY stage").all() as Array<{
    stage: keyof typeof summary;
    count: number;
  }>;

  for (const row of rows) {
    summary[row.stage] = row.count;
  }

  res.json(summary);
});

router.get("/pipeline/deals", (_req, res) => {
  const rows = db
    .prepare(
      `SELECT
        d.*,
        json_object(
          'id', c.id,
          'name', c.name,
          'sector', c.sector,
          'stage', c.stage,
          'geography', c.geography,
          'website', c.website,
          'description', c.description,
          'foundedDate', c.foundedDate,
          'employeeCount', c.employeeCount,
          'fundingTotal', c.fundingTotal,
          'createdAt', c.createdAt,
          'updatedAt', c.updatedAt
        ) AS company,
        CASE WHEN t.id IS NULL THEN NULL ELSE json_object(
          'id', t.id,
          'name', t.name,
          'fundId', t.fundId,
          'sectors', t.sectors,
          'stages', t.stages,
          'geographies', t.geographies,
          'ownershipTargetMin', t.ownershipTargetMin,
          'ownershipTargetMax', t.ownershipTargetMax,
          'preferredFounderPatterns', t.preferredFounderPatterns,
          'antiPatterns', t.antiPatterns,
          'diligenceQuestions', t.diligenceQuestions,
          'active', t.active,
          'createdAt', t.createdAt,
          'updatedAt', t.updatedAt
        ) END AS thesis,
        CASE WHEN f.id IS NULL THEN NULL ELSE json_object(
          'id', f.id,
          'name', f.name,
          'vintageYear', f.vintageYear,
          'targetSize', f.targetSize,
          'strategy', f.strategy,
          'createdAt', f.createdAt
        ) END AS fund
      FROM deals d
      JOIN companies c ON c.id = d.companyId
      LEFT JOIN theses t ON t.id = d.thesisId
      LEFT JOIN funds f ON f.id = d.fundId
      ORDER BY d.lastActivityAt DESC`,
    )
    .all() as Record<string, unknown>[];

  res.json(
    rows.map((row) => ({
      ...row,
      company: JSON.parse(String(row.company)),
      thesis: row.thesis
        ? {
            ...parseJsonFields(JSON.parse(String(row.thesis)), [
              "sectors",
              "stages",
              "geographies",
              "preferredFounderPatterns",
              "antiPatterns",
              "diligenceQuestions",
            ]),
            active: Boolean(parseJsonFields(JSON.parse(String(row.thesis)), ["sectors"]).active),
          }
        : null,
      fund: row.fund ? JSON.parse(String(row.fund)) : null,
    })),
  );
});

export default router;
