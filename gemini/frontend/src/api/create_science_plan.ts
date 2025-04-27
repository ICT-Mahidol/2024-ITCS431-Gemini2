import { createSciencePlanSchema } from "@/components/forms/schemas";
import { CookieHelper } from "@/lib/cookie_helper";
import { BaseResponse } from "@/lib/interfaces";
import { z } from "zod";

export async function createSciencePlan(
  values: z.infer<typeof createSciencePlanSchema>
): Promise<BaseResponse> {
  const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);

  const res = await fetch("/api/scienceplan/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authCookie.token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = (await res.json()) as BaseResponse;

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
