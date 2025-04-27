import { CookieHelper } from "@/lib/cookie_helper";
import { BaseResponse } from "@/lib/interfaces";

export async function deleteSciencePlan(planId: number): Promise<BaseResponse> {
  const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);

  const res = await fetch(`/api/scienceplan/delete?planId=${planId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authCookie.token}`,
      "Content-type": "application/json",
    },
  });

  const data = (await res.json()) as BaseResponse;
  console.log(data);

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
