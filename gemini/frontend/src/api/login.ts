import { loginSchema } from "@/components/forms/schemas";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  const apiUrl = import.meta.env.VITE_API_URL;
  return await fetch(apiUrl + "/user/auth", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });
}
