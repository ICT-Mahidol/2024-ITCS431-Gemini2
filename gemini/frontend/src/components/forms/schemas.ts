import { ColorType, FileQuality, FileType } from "@/lib/enums";
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter a username.",
  }),
  password: z.string().min(1, {
    message: "You must enter a password.",
  }),
});

export const createSciencePlanDataProcessingSchema = z.object({
  fileType: z.enum([FileType.PNG, FileType.JPEG, FileType.RAW]),
  fileQuality: z.enum([FileQuality.LOW, FileQuality.FINE]),
  colorType: z.enum([ColorType.COLOR, ColorType.BW]),
  contrast: z.coerce.number(),
  brightness: z.coerce.number(),
  saturation: z.coerce.number(),
  highlight: z.coerce.number(),
  exposure: z.coerce.number(),
  shadows: z.coerce.number(),
  whites: z.coerce.number(),
  blacks: z.coerce.number(),
  luminance: z.coerce.number(),
  hue: z.coerce.number(),
});

export const createSciencePlanSchema = z
  .object({
    planName: z.string().min(1, { message: "Science plan name is required." }),
    funding: z.coerce.number(),
    objective: z
      .string()
      .min(1, { message: "Science plan objective is required" }),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "startDate must be in YYYY-MM-DD format",
    }),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "endDate must be in YYYY-MM-DD format",
    }),
    dataProcessingReq: createSciencePlanDataProcessingSchema,
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate > startDate;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );
