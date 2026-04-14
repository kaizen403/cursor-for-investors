import { db } from "./index.js";
import { createId, daysAgo } from "../lib/utils.js";

type SeedCompany = {
  id: string;
  name: string;
  sector: string;
  stage: string;
  geography: string;
  website: string;
  description: string;
  foundedDate: string;
  employeeCount: number;
  fundingTotal: number;
};

export function seedIfEmpty() {
  const existing = db.prepare("SELECT COUNT(*) as count FROM companies").get() as { count: number };
  if (existing.count > 0) {
    return;
  }

  const fundId = createId();
  const thesisId = createId();

  const companies: SeedCompany[] = [
    {
      id: createId(),
      name: "Acme Corp",
      sector: "AI Infrastructure",
      stage: "Seed",
      geography: "San Francisco, CA",
      website: "https://acme.example",
      description: "Inference orchestration tooling for multimodal agent teams.",
      foundedDate: "2022-04-15",
      employeeCount: 28,
      fundingTotal: 8_500_000,
    },
    {
      id: createId(),
      name: "Bolt AI",
      sector: "Developer Tools",
      stage: "Pre-Seed",
      geography: "New York, NY",
      website: "https://bolt.example",
      description: "Copilot analytics platform for engineering organizations.",
      foundedDate: "2023-01-09",
      employeeCount: 14,
      fundingTotal: 2_750_000,
    },
    {
      id: createId(),
      name: "Crux Labs",
      sector: "Climate Software",
      stage: "Seed",
      geography: "Austin, TX",
      website: "https://crux.example",
      description: "Industrial emissions workflow automation for mid-market plants.",
      foundedDate: "2021-09-02",
      employeeCount: 19,
      fundingTotal: 5_200_000,
    },
    {
      id: createId(),
      name: "Delta Security",
      sector: "Cybersecurity",
      stage: "Series A",
      geography: "Boston, MA",
      website: "https://delta.example",
      description: "Runtime identity graph for cloud-native security teams.",
      foundedDate: "2020-06-28",
      employeeCount: 41,
      fundingTotal: 16_800_000,
    },
    {
      id: createId(),
      name: "Echo Analytics",
      sector: "Vertical SaaS",
      stage: "Seed",
      geography: "Seattle, WA",
      website: "https://echo.example",
      description: "Revenue intelligence platform for specialty healthcare clinics.",
      foundedDate: "2022-11-18",
      employeeCount: 23,
      fundingTotal: 6_100_000,
    },
  ];

  const thesis = {
    id: thesisId,
    name: "AI Infrastructure - Seed",
    fundId,
    sectors: JSON.stringify(["AI", "Infrastructure"]),
    stages: JSON.stringify(["pre_seed", "seed"]),
    geographies: JSON.stringify(["US", "Europe"]),
    ownershipTargetMin: 0.08,
    ownershipTargetMax: 0.15,
    preferredFounderPatterns: JSON.stringify([
      "technical founders with infra depth",
      "repeat builders from data tooling teams",
    ]),
    antiPatterns: JSON.stringify([
      "services-heavy gross margin profile",
      "single-customer concentration risk",
    ]),
    diligenceQuestions: JSON.stringify([
      "What is the deployment footprint at $1M ARR?",
      "How sticky is the workflow after initial integration?",
      "What moat compounds with usage density?",
    ]),
    active: 1,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(2),
  };

  const deals = [
    {
      id: createId(),
      companyId: companies[0].id,
      fundId,
      stage: "diligence",
      confidence: 83,
      leadPartner: "Nadia Park",
      source: "Warm intro from angel syndicate",
      thesisId,
      createdAt: daysAgo(12),
      updatedAt: daysAgo(1),
      lastActivityAt: daysAgo(1),
    },
    {
      id: createId(),
      companyId: companies[1].id,
      fundId,
      stage: "first_call",
      confidence: 67,
      leadPartner: "Nadia Park",
      source: "Inbound",
      thesisId,
      createdAt: daysAgo(10),
      updatedAt: daysAgo(3),
      lastActivityAt: daysAgo(3),
    },
    {
      id: createId(),
      companyId: companies[2].id,
      fundId,
      stage: "sourced",
      confidence: 55,
      leadPartner: "Leo Grant",
      source: "Founder referral",
      thesisId,
      createdAt: daysAgo(8),
      updatedAt: daysAgo(4),
      lastActivityAt: daysAgo(4),
    },
    {
      id: createId(),
      companyId: companies[3].id,
      fundId,
      stage: "ic",
      confidence: 91,
      leadPartner: "Leo Grant",
      source: "Scout network",
      thesisId,
      createdAt: daysAgo(15),
      updatedAt: daysAgo(1, 14),
      lastActivityAt: daysAgo(1, 14),
    },
    {
      id: createId(),
      companyId: companies[4].id,
      fundId,
      stage: "term_sheet",
      confidence: 88,
      leadPartner: "Priya Shah",
      source: "Existing portfolio intro",
      thesisId,
      createdAt: daysAgo(18),
      updatedAt: daysAgo(2, 16),
      lastActivityAt: daysAgo(2, 16),
    },
  ];

  const people = [
    {
      id: createId(),
      name: "Ari Chen",
      email: "ari@acme.example",
      role: "CEO",
      companyId: companies[0].id,
      linkedinUrl: "https://linkedin.com/in/ari-chen",
      relationshipScore: 82,
      lastContactAt: daysAgo(1),
      tags: JSON.stringify(["founder"]),
      createdAt: daysAgo(12),
      updatedAt: daysAgo(1),
    },
    {
      id: createId(),
      name: "Maya Rios",
      email: "maya@bolt.example",
      role: "CEO",
      companyId: companies[1].id,
      linkedinUrl: "https://linkedin.com/in/maya-rios",
      relationshipScore: 71,
      lastContactAt: daysAgo(3),
      tags: JSON.stringify(["founder"]),
      createdAt: daysAgo(10),
      updatedAt: daysAgo(3),
    },
    {
      id: createId(),
      name: "Tom Becker",
      email: "tom@crux.example",
      role: "Co-Founder",
      companyId: companies[2].id,
      linkedinUrl: "https://linkedin.com/in/tom-becker",
      relationshipScore: 63,
      lastContactAt: daysAgo(4),
      tags: JSON.stringify(["founder"]),
      createdAt: daysAgo(8),
      updatedAt: daysAgo(4),
    },
    {
      id: createId(),
      name: "Sara Okafor",
      email: "sara@network.example",
      role: "Angel Investor",
      companyId: null,
      linkedinUrl: "https://linkedin.com/in/sara-okafor",
      relationshipScore: 77,
      lastContactAt: daysAgo(7),
      tags: JSON.stringify(["angel"]),
      createdAt: daysAgo(13),
      updatedAt: daysAgo(7),
    },
    {
      id: createId(),
      name: "Jordan Miles",
      email: "jordan@network.example",
      role: "Angel Investor",
      companyId: null,
      linkedinUrl: "https://linkedin.com/in/jordan-miles",
      relationshipScore: 69,
      lastContactAt: daysAgo(5),
      tags: JSON.stringify(["angel"]),
      createdAt: daysAgo(16),
      updatedAt: daysAgo(5),
    },
    {
      id: createId(),
      name: "Claire Wong",
      email: "claire@operator.example",
      role: "VP Engineering",
      companyId: null,
      linkedinUrl: "https://linkedin.com/in/claire-wong",
      relationshipScore: 74,
      lastContactAt: daysAgo(6),
      tags: JSON.stringify(["operator"]),
      createdAt: daysAgo(14),
      updatedAt: daysAgo(6),
    },
    {
      id: createId(),
      name: "Ethan Brooks",
      email: "ethan@operator.example",
      role: "CRO",
      companyId: null,
      linkedinUrl: "https://linkedin.com/in/ethan-brooks",
      relationshipScore: 66,
      lastContactAt: daysAgo(9),
      tags: JSON.stringify(["operator"]),
      createdAt: daysAgo(17),
      updatedAt: daysAgo(9),
    },
    {
      id: createId(),
      name: "Nadia Park",
      email: "nadia@neuralyn.example",
      role: "Partner",
      companyId: null,
      linkedinUrl: "https://linkedin.com/in/nadia-park",
      relationshipScore: 95,
      lastContactAt: daysAgo(1),
      tags: JSON.stringify(["partner"]),
      createdAt: daysAgo(25),
      updatedAt: daysAgo(1),
    },
  ];

  const meetings = [
    {
      id: createId(),
      dealId: deals[0].id,
      date: daysAgo(1),
      attendees: JSON.stringify([people[0].id, people[7].id]),
      meetingType: "founder_call",
      rawNotes: "Team has landed two design partners and is hiring a staff engineer.",
      structuredNotes: JSON.stringify({
        metrics: {
          arrRunRate: "$420k",
          grossMargin: "86%",
        },
        risks: ["integration depth still unclear"],
        asks: ["customer references", "security review packet"],
        nextSteps: ["schedule technical diligence", "collect reference calls"],
      }),
      createdAt: daysAgo(1),
    },
    {
      id: createId(),
      dealId: deals[3].id,
      date: daysAgo(2),
      attendees: JSON.stringify([people[7].id]),
      meetingType: "partner_meeting",
      rawNotes: "IC prep focused on enterprise retention and margin durability.",
      structuredNotes: JSON.stringify({
        metrics: {
          netDollarRetention: "142%",
          burnMultiple: "1.3x",
        },
        risks: ["channel concentration"],
        asks: ["final customer cohort report"],
        nextSteps: ["prepare IC memo", "confirm pricing references"],
      }),
      createdAt: daysAgo(2),
    },
    {
      id: createId(),
      dealId: deals[4].id,
      date: daysAgo(3),
      attendees: JSON.stringify([people[5].id, people[6].id]),
      meetingType: "reference",
      rawNotes: "Operators praised implementation speed and clinical workflow adoption.",
      structuredNotes: JSON.stringify({
        metrics: {
          implementationTime: "11 days",
          expansionRate: "38%",
        },
        risks: ["early enterprise support load"],
        asks: ["reference transcript digest"],
        nextSteps: ["legal diligence", "term sheet revisions"],
      }),
      createdAt: daysAgo(3),
    },
  ];

  const memos = [
    {
      id: createId(),
      dealId: deals[3].id,
      memoType: "ic_memo",
      title: "Delta Security IC Memo",
      content:
        "# Investment case\n\nStrong security tailwinds, credible founding team, and clear platform wedge.\n\n## Risks\n\n- crowded market\n- enterprise sales cycles\n",
      status: "review",
      author: "Nadia Park",
      createdAt: daysAgo(2),
      updatedAt: daysAgo(1),
    },
    {
      id: createId(),
      dealId: deals[0].id,
      memoType: "company_brief",
      title: "Acme Corp Company Brief",
      content:
        "# Snapshot\n\nAcme sells orchestration infrastructure for multimodal agent systems with strong early design-partner pull.",
      status: "draft",
      author: "Leo Grant",
      createdAt: daysAgo(4),
      updatedAt: daysAgo(1),
    },
  ];

  const tasks = [
    {
      id: createId(),
      dealId: deals[0].id,
      assignee: "Nadia Park",
      title: "Schedule security diligence",
      description: "Lock a technical review with the founding engineer.",
      status: "open",
      dueDate: daysAgo(-2),
      createdAt: daysAgo(1),
      completedAt: null,
    },
    {
      id: createId(),
      dealId: deals[1].id,
      assignee: "Leo Grant",
      title: "Review founder deck",
      description: "Compare latest product roadmap to the first call notes.",
      status: "open",
      dueDate: daysAgo(-1),
      createdAt: daysAgo(3),
      completedAt: null,
    },
    {
      id: createId(),
      dealId: deals[3].id,
      assignee: "Priya Shah",
      title: "Finalize IC narrative",
      description: "Fold retention data into committee memo.",
      status: "done",
      dueDate: daysAgo(1),
      createdAt: daysAgo(4),
      completedAt: daysAgo(1),
    },
    {
      id: createId(),
      dealId: deals[4].id,
      assignee: "Nadia Park",
      title: "Share legal comments",
      description: "Return markup on term sheet language.",
      status: "open",
      dueDate: daysAgo(0),
      createdAt: daysAgo(2),
      completedAt: null,
    },
  ];

  const insert = db.transaction(() => {
    db.prepare(
      `INSERT INTO funds (id, name, vintageYear, targetSize, strategy, createdAt)
       VALUES (@id, @name, @vintageYear, @targetSize, @strategy, @createdAt)`,
    ).run({
      id: fundId,
      name: "Neuralyn Fund I",
      vintageYear: 2024,
      targetSize: 75_000_000,
      strategy: "Seed software investments",
      createdAt: daysAgo(30),
    });

    db.prepare(
      `INSERT INTO theses (
        id, name, fundId, sectors, stages, geographies, ownershipTargetMin, ownershipTargetMax,
        preferredFounderPatterns, antiPatterns, diligenceQuestions, active, createdAt, updatedAt
      ) VALUES (
        @id, @name, @fundId, @sectors, @stages, @geographies, @ownershipTargetMin, @ownershipTargetMax,
        @preferredFounderPatterns, @antiPatterns, @diligenceQuestions, @active, @createdAt, @updatedAt
      )`,
    ).run(thesis);

    const companyStatement = db.prepare(
      `INSERT INTO companies (
        id, name, sector, stage, geography, website, description, foundedDate,
        employeeCount, fundingTotal, createdAt, updatedAt
      ) VALUES (
        @id, @name, @sector, @stage, @geography, @website, @description, @foundedDate,
        @employeeCount, @fundingTotal, @createdAt, @updatedAt
      )`,
    );

    for (const company of companies) {
      companyStatement.run({
        ...company,
        createdAt: daysAgo(20),
        updatedAt: daysAgo(2),
      });
    }

    const dealStatement = db.prepare(
      `INSERT INTO deals (
        id, companyId, fundId, stage, confidence, leadPartner, source, thesisId,
        createdAt, updatedAt, lastActivityAt
      ) VALUES (
        @id, @companyId, @fundId, @stage, @confidence, @leadPartner, @source, @thesisId,
        @createdAt, @updatedAt, @lastActivityAt
      )`,
    );
    for (const deal of deals) {
      dealStatement.run(deal);
    }

    const peopleStatement = db.prepare(
      `INSERT INTO people (
        id, name, email, role, companyId, linkedinUrl, relationshipScore, lastContactAt,
        tags, createdAt, updatedAt
      ) VALUES (
        @id, @name, @email, @role, @companyId, @linkedinUrl, @relationshipScore, @lastContactAt,
        @tags, @createdAt, @updatedAt
      )`,
    );
    for (const person of people) {
      peopleStatement.run(person);
    }

    const meetingStatement = db.prepare(
      `INSERT INTO meetings (
        id, dealId, date, attendees, meetingType, rawNotes, structuredNotes, createdAt
      ) VALUES (
        @id, @dealId, @date, @attendees, @meetingType, @rawNotes, @structuredNotes, @createdAt
      )`,
    );
    for (const meeting of meetings) {
      meetingStatement.run(meeting);
    }

    const memoStatement = db.prepare(
      `INSERT INTO memos (
        id, dealId, memoType, title, content, status, author, createdAt, updatedAt
      ) VALUES (
        @id, @dealId, @memoType, @title, @content, @status, @author, @createdAt, @updatedAt
      )`,
    );
    for (const memo of memos) {
      memoStatement.run(memo);
    }

    const taskStatement = db.prepare(
      `INSERT INTO tasks (
        id, dealId, assignee, title, description, status, dueDate, createdAt, completedAt
      ) VALUES (
        @id, @dealId, @assignee, @title, @description, @status, @dueDate, @createdAt, @completedAt
      )`,
    );
    for (const task of tasks) {
      taskStatement.run(task);
    }
  });

  insert();
}
