import { CookieHelper } from "@/lib/cookie_helper";
import { BaseResponse } from "@/lib/interfaces";

export async function deleteSciencePlan(planId: number): Promise<BaseResponse> {
  const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);
  const apiUrl = import.meta.env.VITE_API_URL;

  const res = await fetch(apiUrl + "/scienceplan/delete", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authCookie.token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(planId),
  });

  const data = (await res.json()) as BaseResponse;

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
