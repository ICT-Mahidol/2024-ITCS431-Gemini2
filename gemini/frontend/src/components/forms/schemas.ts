import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter a username.",
  }),
  password: z.string().min(1, {
    message: "You must enter a password.",
  }),
});

export const createSciencePlanSchema = z.object({
  // TODO: make a create science plan schema based on https://docs.google.com/document/d/1ulJ6UF62DdzWdpL_ksR_7Vck7x4nkkwNRPS4W4OQCEM/edit?tab=t.0#heading=h.gpchy1dg9kg at Create Science Plan
});
