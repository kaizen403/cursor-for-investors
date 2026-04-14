import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DealStage, DealWithCompany } from "@vc-ide/shared";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stageOrder: DealStage[] = [
  "sourced",
  "first_call",
  "diligence",
  "ic",
  "term_sheet",
  "closed",
  "passed",
];

export function formatRelativeDate(dateString?: string | null) {
  if (!dateString) {
    return "No activity";
  }

  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "1 day ago";
  }

  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) {
    return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleDateString();
}

export function formatCurrency(value?: number | null) {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: value >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function confidenceLabel(value?: number | null) {
  if (value == null) {
    return "Unscored";
  }

  if (value >= 80) {
    return "High";
  }

  if (value >= 60) {
    return "Medium";
  }

  return "Low";
}

export function stageLabel(stage: DealStage) {
  return stage
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function groupDealsByStage(deals: DealWithCompany[]) {
  return stageOrder.reduce<Record<DealStage, DealWithCompany[]>>(
    (groups, stage) => {
      groups[stage] = deals.filter((deal) => deal.stage === stage);
      return groups;
    },
    {
      sourced: [],
      first_call: [],
      diligence: [],
      ic: [],
      term_sheet: [],
      closed: [],
      passed: [],
    },
  );
}
