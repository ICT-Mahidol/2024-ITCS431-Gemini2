import { CookieHelper } from "@/lib/cookie_helper";

export async function getStarSystemEnum(): Promise<string[]> {
  const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);

  const response = await fetch("/api/data/starsystem", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authCookie.token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch star system enums: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return data;
}
