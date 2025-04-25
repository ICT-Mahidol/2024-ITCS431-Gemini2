import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter a username.",
  }),
  password: z.string().min(1, {
    message: "You must enter a password.",
  }),
});

export const createSciencePlanDataprocessingSchema = z.object({
  fileType: z.enum(["PNG", "JEPG", "RAW"]),
  fileQuality: z.enum(["Low", "Fine"]),
  colorType: z.enum(["Color", "BW"]),
  contrast: z.number(),
  brightness: z.number(),
  saturation: z.number(),
  highlight: z.number(),
  exposure: z.number(),
  shadows: z.number(),
  whites: z.number(),
  blacks: z.number(),
  luminance: z.number(),
  hue: z.number(),
});

export const createSciencePlanSchema = z.object({
  // TODO: make a create science plan schema based on https://docs.google.com/document/d/1ulJ6UF62DdzWdpL_ksR_7Vck7x4nkkwNRPS4W4OQCEM/edit?tab=t.0#heading=h.gpchy1dg9kg at Create Science Plan
  planName: z.string().min(1, { message: "Science plan name is required." }),
  funding: z.number(),
  objective: z
    .string()
    .min(1, { message: "Science plan objective is required" }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "startDate must be in YYYY-MM-DD format",
  }),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "endDate must be in YYYY-MM-DD format",
  }),
  dataProcessingReq: createSciencePlanDataprocessingSchema,
});
