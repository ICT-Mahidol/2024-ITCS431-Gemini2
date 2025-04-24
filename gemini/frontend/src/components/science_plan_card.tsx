import { PlanStatus } from "@/lib/enums";

export function SciencePlanCard(
  planId: number,
  planName: string,
  planStatus: PlanStatus
) {
  return (
    <main>
      {planId}
      {planName}
      {planStatus}
    </main>
  );
}
