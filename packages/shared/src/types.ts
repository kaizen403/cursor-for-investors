export type DealStage =
  | "sourced"
  | "first_call"
  | "diligence"
  | "ic"
  | "term_sheet"
  | "closed"
  | "passed";

export type MeetingType =
  | "founder_call"
  | "partner_meeting"
  | "reference"
  | "other";

export type MemoType = "ic_memo" | "company_brief" | "meeting_summary";
export type MemoStatus = "draft" | "review" | "final";
export type TaskStatus = "open" | "done" | "cancelled";
export type PersonTag = "founder" | "angel" | "operator" | "lp" | "partner";

export interface Company {
  id: string;
  name: string;
  sector?: string | null;
  stage?: string | null;
  geography?: string | null;
  website?: string | null;
  description?: string | null;
  foundedDate?: string | null;
  employeeCount?: number | null;
  fundingTotal?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Fund {
  id: string;
  name: string;
  vintageYear?: number | null;
  targetSize?: number | null;
  strategy?: string | null;
  createdAt: string;
}

export interface Thesis {
  id: string;
  name: string;
  fundId?: string | null;
  sectors: string[];
  stages: string[];
  geographies: string[];
  ownershipTargetMin?: number | null;
  ownershipTargetMax?: number | null;
  preferredFounderPatterns: string[];
  antiPatterns: string[];
  diligenceQuestions: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  companyId: string;
  fundId?: string | null;
  stage: DealStage;
  confidence?: number | null;
  leadPartner?: string | null;
  source?: string | null;
  thesisId?: string | null;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
}

export interface Person {
  id: string;
  name: string;
  email?: string | null;
  role?: string | null;
  companyId?: string | null;
  linkedinUrl?: string | null;
  relationshipScore?: number | null;
  lastContactAt?: string | null;
  tags: PersonTag[];
  createdAt: string;
  updatedAt: string;
}

export interface StructuredMeetingNotes {
  metrics: Record<string, string>;
  risks: string[];
  asks: string[];
  nextSteps: string[];
}

export interface Meeting {
  id: string;
  dealId?: string | null;
  date: string;
  attendees: string[];
  meetingType: MeetingType;
  rawNotes?: string | null;
  structuredNotes: StructuredMeetingNotes;
  createdAt: string;
}

export interface Memo {
  id: string;
  dealId?: string | null;
  memoType: MemoType;
  title: string;
  content?: string | null;
  status: MemoStatus;
  author?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  dealId?: string | null;
  assignee?: string | null;
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueDate?: string | null;
  createdAt: string;
  completedAt?: string | null;
}

export interface ActivityEntry {
  entityType:
    | "company"
    | "deal"
    | "person"
    | "meeting"
    | "memo"
    | "thesis"
    | "task"
    | "fund";
  entityId: string;
  entityName: string;
  action: "created" | "updated";
  timestamp: string;
}

export interface PipelineSummary {
  sourced: number;
  first_call: number;
  diligence: number;
  ic: number;
  term_sheet: number;
  closed: number;
  passed: number;
}

export interface DealWithCompany extends Deal {
  company: Company;
  fund?: Fund | null;
  thesis?: Thesis | null;
}

export interface DealFull extends DealWithCompany {
  meetings: Meeting[];
  memos: Memo[];
  tasks: Task[];
  people: Person[];
  activity: ActivityEntry[];
}

export interface SearchResults {
  companies: Company[];
  people: Person[];
  deals: DealWithCompany[];
}

export type CreateCompanyInput = Omit<Company, "id" | "createdAt" | "updatedAt">;
export type UpdateCompanyInput = Partial<CreateCompanyInput>;
export type CreateDealInput = Omit<Deal, "id" | "createdAt" | "updatedAt" | "lastActivityAt">;
export type UpdateDealInput = Partial<CreateDealInput>;
export type CreatePersonInput = Omit<Person, "id" | "createdAt" | "updatedAt">;
export type UpdatePersonInput = Partial<CreatePersonInput>;
export type CreateMeetingInput = Omit<Meeting, "id" | "createdAt">;
export type UpdateMeetingInput = Partial<CreateMeetingInput>;
export type CreateMemoInput = Omit<Memo, "id" | "createdAt" | "updatedAt">;
export type UpdateMemoInput = Partial<CreateMemoInput>;
export type CreateThesisInput = Omit<Thesis, "id" | "createdAt" | "updatedAt">;
export type UpdateThesisInput = Partial<CreateThesisInput>;
export type CreateTaskInput = Omit<Task, "id" | "createdAt" | "completedAt">;
export type UpdateTaskInput = Partial<CreateTaskInput>;
export type CreateFundInput = Omit<Fund, "id" | "createdAt">;
export type UpdateFundInput = Partial<CreateFundInput>;
