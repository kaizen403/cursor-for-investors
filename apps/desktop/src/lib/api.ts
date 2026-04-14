import type {
  ActivityEntry,
  Company,
  CreateCompanyInput,
  CreateDealInput,
  CreateFundInput,
  CreateMeetingInput,
  CreateMemoInput,
  CreatePersonInput,
  CreateTaskInput,
  CreateThesisInput,
  Deal,
  DealFull,
  DealWithCompany,
  Fund,
  Meeting,
  Memo,
  Person,
  PipelineSummary,
  SearchResults,
  Task,
  Thesis,
  UpdateCompanyInput,
  UpdateDealInput,
  UpdateFundInput,
  UpdateMeetingInput,
  UpdateMemoInput,
  UpdatePersonInput,
  UpdateTaskInput,
  UpdateThesisInput,
} from "@vc-ide/shared";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3001/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const queryKeys = {
  companies: ["companies"] as const,
  company: (id: string) => ["companies", id] as const,
  deals: ["deals"] as const,
  deal: (id: string) => ["deals", id] as const,
  dealFull: (id: string) => ["deals", id, "full"] as const,
  people: ["people"] as const,
  person: (id: string) => ["people", id] as const,
  meetings: ["meetings"] as const,
  meeting: (id: string) => ["meetings", id] as const,
  memos: ["memos"] as const,
  memo: (id: string) => ["memos", id] as const,
  theses: ["theses"] as const,
  thesis: (id: string) => ["theses", id] as const,
  tasks: ["tasks"] as const,
  task: (id: string) => ["tasks", id] as const,
  funds: ["funds"] as const,
  fund: (id: string) => ["funds", id] as const,
  pipelineDeals: ["pipeline", "deals"] as const,
  pipelineSummary: ["pipeline", "summary"] as const,
  search: (query: string) => ["search", query] as const,
  activity: (limit: number) => ["activity", limit] as const,
};

export const api = {
  companies: {
    list: () => request<Company[]>("/companies"),
    get: (id: string) => request<Company>(`/companies/${id}`),
    create: (data: CreateCompanyInput) =>
      request<Company>("/companies", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateCompanyInput) =>
      request<Company>(`/companies/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<void>(`/companies/${id}`, {
        method: "DELETE",
      }),
  },
  deals: {
    list: () => request<Deal[]>("/deals"),
    get: (id: string) => request<Deal>(`/deals/${id}`),
    full: (id: string) => request<DealFull>(`/deals/${id}/full`),
    create: (data: CreateDealInput) =>
      request<Deal>("/deals", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateDealInput) =>
      request<Deal>(`/deals/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<void>(`/deals/${id}`, {
        method: "DELETE",
      }),
  },
  people: {
    list: () => request<Person[]>("/people"),
    get: (id: string) => request<Person>(`/people/${id}`),
    create: (data: CreatePersonInput) =>
      request<Person>("/people", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdatePersonInput) =>
      request<Person>(`/people/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
  meetings: {
    list: () => request<Meeting[]>("/meetings"),
    get: (id: string) => request<Meeting>(`/meetings/${id}`),
    create: (data: CreateMeetingInput) =>
      request<Meeting>("/meetings", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateMeetingInput) =>
      request<Meeting>(`/meetings/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
  memos: {
    list: () => request<Memo[]>("/memos"),
    get: (id: string) => request<Memo>(`/memos/${id}`),
    create: (data: CreateMemoInput) =>
      request<Memo>("/memos", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateMemoInput) =>
      request<Memo>(`/memos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
  theses: {
    list: () => request<Thesis[]>("/theses"),
    get: (id: string) => request<Thesis>(`/theses/${id}`),
    create: (data: CreateThesisInput) =>
      request<Thesis>("/theses", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateThesisInput) =>
      request<Thesis>(`/theses/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
  tasks: {
    list: () => request<Task[]>("/tasks"),
    get: (id: string) => request<Task>(`/tasks/${id}`),
    create: (data: CreateTaskInput) =>
      request<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateTaskInput) =>
      request<Task>(`/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
  funds: {
    list: () => request<Fund[]>("/funds"),
    get: (id: string) => request<Fund>(`/funds/${id}`),
    create: (data: CreateFundInput) =>
      request<Fund>("/funds", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateFundInput) =>
      request<Fund>(`/funds/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
  pipeline: {
    deals: () => request<DealWithCompany[]>("/pipeline/deals"),
    summary: () => request<PipelineSummary>("/pipeline/summary"),
  },
  search: {
    query: (q: string) => request<SearchResults>(`/search?q=${encodeURIComponent(q)}`),
  },
  activity: {
    recent: (limit = 50) => request<ActivityEntry[]>(`/activity?limit=${limit}`),
  },
};
