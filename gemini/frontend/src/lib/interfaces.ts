import { ColorType, FileQuality, FileType, PlanStatus } from "./enums";

export interface SciencePlan {
  planId: number;
  planName: string;
  planStatus: PlanStatus;
}

export interface SciencePlanDetails {
  planId: number;
  planName: string;
  creator: User;
  funding: number;
  objective: string;
  startDate: Date;
  endDate: Date;
  planStatus: PlanStatus;
  dataProcessingReq: DataProcessingRequirement;
}

interface User {
  userId: number;
  firstName: string;
  lastName: string;
}

interface DataProcessingRequirement {
  fileType: FileType;
  fileQuality: FileQuality;
  colorType: ColorType;
  contrast: number;
  brightness: number;
  saturation: number;
  highlight: number;
  exposure: number;
  shadows: number;
  whites: number;
  blacks: number;
  luminance: number;
  hue: number;
}
