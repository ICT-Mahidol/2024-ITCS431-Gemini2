import { CookieHelper } from "@/lib/cookie_helper";
import { PlanStatus } from "@/lib/enums";
import { SciencePlan } from "@/lib/interfaces";

export async function getSciencePlans(
  status: PlanStatus | null
): Promise<SciencePlan[]> {
  const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);
  const statusTemp = status ?? "";

  const res = await fetch(`/api/scienceplan/list?status=${statusTemp}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${authCookie.token}`,
    },
  });

  const body = (await res.json()) as SciencePlan[];

  return body;
}
