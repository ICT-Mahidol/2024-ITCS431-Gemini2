import { createSciencePlanSchema } from "@/components/forms/schemas";
import { z } from "zod";

export async function createSciencePlan(
  values: z.infer<typeof createSciencePlanSchema>
) {
  const apiUrl = import.meta.env.VITE_API_URL;
  return await fetch(apiUrl + "/scienceplan/create", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });
}
