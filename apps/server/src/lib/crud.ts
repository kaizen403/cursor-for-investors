import { Router } from "express";
import type Database from "better-sqlite3";

import { db } from "../db/index.js";
import { createId, nowIso, parseJsonFields, quoteIdentifier, stringifyJsonFields } from "./utils.js";

type CrudConfig = {
  table: string;
  entityName: string;
  requiredFields?: string[];
  filterableFields?: string[];
  jsonFields?: string[];
  createdAt?: boolean;
  updatedAt?: boolean;
  defaults?: Record<string, unknown>;
  afterRead?: (record: Record<string, unknown>) => Record<string, unknown>;
  onBeforeSave?: (record: Record<string, unknown>, mode: "create" | "update") => Record<string, unknown>;
  orderBy?: string;
};

function mapRecord(
  record: Record<string, unknown>,
  jsonFields: string[],
  afterRead?: CrudConfig["afterRead"],
) {
  const parsed = parseJsonFields(record, jsonFields);
  return afterRead ? afterRead(parsed) : parsed;
}

function insertRecord(database: Database.Database, table: string, record: Record<string, unknown>) {
  const columns = Object.keys(record);
  const columnSql = columns.map(quoteIdentifier).join(", ");
  const valueSql = columns.map((column) => `@${column}`).join(", ");
  database
    .prepare(`INSERT INTO ${quoteIdentifier(table)} (${columnSql}) VALUES (${valueSql})`)
    .run(record);
}

export function createCrudRouter(config: CrudConfig) {
  const router = Router();
  const {
    table,
    entityName,
    requiredFields = [],
    filterableFields = [],
    jsonFields = [],
    createdAt = true,
    updatedAt = true,
    defaults = {},
    afterRead,
    onBeforeSave,
    orderBy = "createdAt DESC",
  } = config;

  router.get(`/${table}`, (req, res) => {
    const filters = filterableFields.filter((field) => req.query[field] !== undefined);
    const whereClause =
      filters.length > 0
        ? `WHERE ${filters.map((field) => `${quoteIdentifier(field)} = @${field}`).join(" AND ")}`
        : "";
    const params = Object.fromEntries(filters.map((field) => [field, req.query[field]]));
    const rows = db
      .prepare(`SELECT * FROM ${quoteIdentifier(table)} ${whereClause} ORDER BY ${orderBy}`)
      .all(params) as Record<string, unknown>[];

    res.json(rows.map((row) => mapRecord(row, jsonFields, afterRead)));
  });

  router.get(`/${table}/:id`, (req, res) => {
    const row = db
      .prepare(`SELECT * FROM ${quoteIdentifier(table)} WHERE id = ?`)
      .get(req.params.id) as Record<string, unknown> | undefined;

    if (!row) {
      res.status(404).json({ error: `${entityName} not found` });
      return;
    }

    res.json(mapRecord(row, jsonFields, afterRead));
  });

  router.post(`/${table}`, (req, res) => {
    const body = { ...defaults, ...(req.body as Record<string, unknown>) };
    const missing = requiredFields.filter((field) => body[field] == null || body[field] === "");

    if (missing.length > 0) {
      res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
      return;
    }

    const timestamp = nowIso();
    const record: Record<string, unknown> = {
      id: createId(),
      ...body,
    };

    if (createdAt) {
      record.createdAt = timestamp;
    }

    if (updatedAt) {
      record.updatedAt = timestamp;
    }

    const prepared = onBeforeSave ? onBeforeSave(record, "create") : record;
    insertRecord(db, table, stringifyJsonFields(prepared, jsonFields));

    const createdRecord = db
      .prepare(`SELECT * FROM ${quoteIdentifier(table)} WHERE id = ?`)
      .get(prepared.id) as Record<string, unknown>;

    res.status(201).json(mapRecord(createdRecord, jsonFields, afterRead));
  });

  router.patch(`/${table}/:id`, (req, res) => {
    const existing = db
      .prepare(`SELECT * FROM ${quoteIdentifier(table)} WHERE id = ?`)
      .get(req.params.id) as Record<string, unknown> | undefined;

    if (!existing) {
      res.status(404).json({ error: `${entityName} not found` });
      return;
    }

    const body = req.body as Record<string, unknown>;
    const columns = Object.keys(body);

    if (columns.length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }

    const record: Record<string, unknown> = { ...body };
    if (updatedAt) {
      record.updatedAt = nowIso();
    }

    const prepared = onBeforeSave ? onBeforeSave(record, "update") : record;
    const values = stringifyJsonFields(prepared, jsonFields);
    const assignments = Object.keys(values)
      .map((column) => `${quoteIdentifier(column)} = @${column}`)
      .join(", ");

    db.prepare(`UPDATE ${quoteIdentifier(table)} SET ${assignments} WHERE id = @id`).run({
      ...values,
      id: req.params.id,
    });

    const updatedRecord = db
      .prepare(`SELECT * FROM ${quoteIdentifier(table)} WHERE id = ?`)
      .get(req.params.id) as Record<string, unknown>;

    res.json(mapRecord(updatedRecord, jsonFields, afterRead));
  });

  router.delete(`/${table}/:id`, (req, res) => {
    const result = db
      .prepare(`DELETE FROM ${quoteIdentifier(table)} WHERE id = ?`)
      .run(req.params.id);

    if (result.changes === 0) {
      res.status(404).json({ error: `${entityName} not found` });
      return;
    }

    res.status(204).send();
  });

  return router;
}
