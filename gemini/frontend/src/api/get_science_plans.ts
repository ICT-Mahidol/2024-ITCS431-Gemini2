import { PlanStatus } from "@/lib/enums";
import { SciencePlan } from "@/lib/interfaces";

export async function getSciencePlans(
  status: PlanStatus | null
): Promise<SciencePlan[]> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(apiUrl + `/scienceplan/list?status=${status}`);
  const body = (await res.json()) as SciencePlan[];
  return body;
}
