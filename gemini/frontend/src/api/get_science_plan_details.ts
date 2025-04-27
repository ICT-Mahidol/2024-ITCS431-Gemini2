import { CookieHelper } from "@/lib/cookie_helper";
import { SciencePlanDetails } from "@/lib/interfaces";

export async function getSciencePlanDetails(
  planId: number
): Promise<SciencePlanDetails> {
  const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);
  console.log(authCookie.token);

  const res = await fetch(`/api/scienceplan?planId=${planId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authCookie.token}`,
      "Content-type": "application/json",
    },
  });

  const body = await res.json();
  console.log(body);

  return body;
}
