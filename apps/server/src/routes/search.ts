import { Router } from "express";

import { db } from "../db/index.js";
import { parseJsonFields } from "../lib/utils.js";

const router = Router();

router.get("/search", (req, res) => {
  const query = String(req.query.q ?? "").trim();

  if (!query) {
    res.json({ companies: [], people: [], deals: [] });
    return;
  }

  const like = `%${query}%`;
  const companies = db
    .prepare("SELECT * FROM companies WHERE name LIKE ? OR sector LIKE ? ORDER BY updatedAt DESC LIMIT 8")
    .all(like, like) as Record<string, unknown>[];
  const people = (
    db
      .prepare("SELECT * FROM people WHERE name LIKE ? OR role LIKE ? ORDER BY relationshipScore DESC LIMIT 8")
      .all(like, like) as Record<string, unknown>[]
  ).map((person) => parseJsonFields(person, ["tags"]));
  const deals = db
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
        ) AS company
      FROM deals d
      JOIN companies c ON c.id = d.companyId
      WHERE c.name LIKE ? OR d.leadPartner LIKE ? OR d.source LIKE ?
      ORDER BY d.lastActivityAt DESC
      LIMIT 8`,
    )
    .all(like, like, like) as Record<string, unknown>[];

  res.json({
    companies,
    people,
    deals: deals.map((deal) => ({
      ...deal,
      company: JSON.parse(String(deal.company)),
    })),
  });
});

export default router;
