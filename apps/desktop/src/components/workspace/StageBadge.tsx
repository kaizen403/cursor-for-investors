import type { DealStage } from "@vc-ide/shared";

import { stageLabel } from "../../lib/utils";

export function StageBadge({ stage }: { stage: DealStage }) {
  return <span className="badge">{stageLabel(stage)}</span>;
}
