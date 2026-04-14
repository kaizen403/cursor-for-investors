import { v4 as uuidv4 } from "uuid";

export function createId() {
  return uuidv4();
}

export function nowIso() {
  return new Date().toISOString();
}

export function daysAgo(days: number, hour = 11) {
  const value = new Date();
  value.setUTCDate(value.getUTCDate() - days);
  value.setUTCHours(hour, 0, 0, 0);
  return value.toISOString();
}

export function stringifyJsonFields(record: Record<string, unknown>, jsonFields: string[]) {
  const next = { ...record };

  for (const field of jsonFields) {
    const value = next[field];
    if (value !== undefined) {
      next[field] = JSON.stringify(value ?? null);
    }
  }

  return next;
}

export function parseJsonFields<T extends Record<string, unknown>>(record: T, jsonFields: string[]) {
  for (const field of jsonFields) {
    const value = record[field];
    if (typeof value === "string" && value.length > 0) {
      try {
        record[field] = JSON.parse(value);
      } catch {
        record[field] = value;
      }
    } else if (value == null) {
      record[field] = Array.isArray(value) ? [] : value;
    }
  }

  return record;
}

export function quoteIdentifier(identifier: string) {
  return `"${identifier.replaceAll('"', '""')}"`;
}
