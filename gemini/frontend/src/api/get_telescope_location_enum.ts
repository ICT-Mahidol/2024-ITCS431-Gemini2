import { CookieHelper } from "@/lib/cookie_helper";

export async function getTelescopeLocationEnum(): Promise<string[]> {
  const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);

  const response = await fetch("/api/data/telescopelocation", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authCookie.token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  return data;
}
