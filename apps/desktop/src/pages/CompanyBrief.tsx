import { CompanyCard } from "../components/workspace/CompanyCard";
import { useDealFull } from "../hooks/useDeals";

export function CompanyBrief({ dealId }: { dealId?: string }) {
  const dealQuery = useDealFull(dealId);

  if (!dealId) {
    return <div className="empty-state">Choose a deal to inspect the linked company brief.</div>;
  }

  if (dealQuery.isLoading) {
    return <div className="empty-state">Loading company brief…</div>;
  }

  if (!dealQuery.data) {
    return <div className="empty-state">Company brief unavailable.</div>;
  }

  return <CompanyCard company={dealQuery.data.company} thesis={dealQuery.data.thesis} />;
}
