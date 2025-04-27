import { CookieHelper } from "@/lib/cookie_helper";
import { BaseResponse } from "@/lib/interfaces";

export async function testSciencePlan(planId: number): Promise<BaseResponse> {
  const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);

  const res = await fetch(`/api/scienceplan/test?planId=${planId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authCookie.token}`,
      "Content-type": "application/json",
    },
  });

  const data = (await res.json()) as BaseResponse;

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
