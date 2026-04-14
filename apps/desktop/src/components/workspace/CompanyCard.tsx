import type { Company, Thesis } from "@vc-ide/shared";

import { formatCurrency } from "../../lib/utils";

export function CompanyCard({
  company,
  thesis,
}: {
  company: Company;
  thesis?: Thesis | null;
}) {
  return (
    <section className="data-card">
      <div className="split-inline">
        <div>
          <div className="muted">Company</div>
          <strong>{company.name}</strong>
        </div>
        <span className="badge">{company.stage ?? "Unstaged"}</span>
      </div>
      <div className="card-grid" style={{ marginTop: 12 }}>
        <div>
          <div className="muted">Sector</div>
          <div>{company.sector ?? "—"}</div>
        </div>
        <div>
          <div className="muted">Geography</div>
          <div>{company.geography ?? "—"}</div>
        </div>
        <div>
          <div className="muted">Funding</div>
          <div>{formatCurrency(company.fundingTotal)}</div>
        </div>
        <div>
          <div className="muted">Employees</div>
          <div>{company.employeeCount ?? "—"}</div>
        </div>
      </div>
      <p className="muted" style={{ marginTop: 12 }}>
        {company.description ?? "No company summary recorded."}
      </p>
      {thesis ? (
        <div className="badge" style={{ marginTop: 12 }}>
          Thesis: {thesis.name}
        </div>
      ) : null}
    </section>
  );
}
