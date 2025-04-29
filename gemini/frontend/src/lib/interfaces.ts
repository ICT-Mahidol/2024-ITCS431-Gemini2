import { ColorType, FileQuality, FileType, PlanStatus, Role } from "./enums";

export interface BaseResponse {
  message: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface Payload {
  userName: string;
  role: Role;
}

export interface SciencePlan {
  planId: number;
  planName: string;
  planStatus: PlanStatus;
}

export interface SciencePlanDetails {
  planNo: number;
  planName: string;
  creator: string;
  submitter: string;
  fundingInUSD: number;
  objectives: string;
  startDate: Date;
  endDate: Date;
  starSystem: string;
  telescopeLocation: string;
  status: PlanStatus;
  dataProcRequirements: DataProcessingRequirement[];
}

export interface DataProcessingRequirement {
  fileType: FileType;
  fileQuality: FileQuality;
  colorType: ColorType;
  contrast: number;
  brightness: number;
  saturation: number;
  highlights: number;
  exposure: number;
  shadows: number;
  whites: number;
  blacks: number;
  luminance: number;
  hue: number;
}
