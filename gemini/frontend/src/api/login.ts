import { loginSchema } from "@/components/forms/schemas";
import { LoginResponse } from "@/lib/interfaces";
import { z } from "zod";

export async function login(
  values: z.infer<typeof loginSchema>
): Promise<LoginResponse> {
  console.log(values);

  const res = await fetch("/api/user/auth", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (res.status === 401) {
    throw new Error("Invalid username or password");
  } else if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = (await res.json()) as LoginResponse;
  return data;
}
