import { SciencePlanDetails } from "@/lib/interfaces";

export async function getSciencePlanDetails(
  planId: number
): Promise<SciencePlanDetails> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(apiUrl + `/scienceplan?planId=${planId}`);
  const body = (await res.json()) as SciencePlanDetails;
  return body;
}
