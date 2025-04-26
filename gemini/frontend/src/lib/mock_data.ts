import { ColorType, FileQuality, FileType, PlanStatus } from "./enums";
import { SciencePlan, SciencePlanDetails } from "./interfaces";

export const SciencePlansMock: SciencePlan[] = [
  {
    planId: 1,
    planName: "Study of livability on Mars",
    planStatus: PlanStatus.CREATED,
  },
  {
    planId: 2,
    planName: "Investigation of natural resources on Titan",
    planStatus: PlanStatus.SUBMITTED,
  },
  {
    planId: 3,
    planName: "Capture DEVN picture on the moon.",
    planStatus: PlanStatus.TESTED,
  },
  {
    planId: 4,
    planName: "Capture DEVN picture on the moon.",
    planStatus: PlanStatus.TESTED,
  },
  {
    planId: 5,
    planName: "Capture alien on the sun.",
    planStatus: PlanStatus.SUBMITTED,
  },
  {
    planId: 6,
    planName: "Capture Neil Armstrong on the moon.",
    planStatus: PlanStatus.CREATED,
  },
  {
    planId: 7,
    planName: "Fucking stupid dude.",
    planStatus: PlanStatus.TESTED,
  },
];

export const SciencePlanDetailsMock: SciencePlanDetails = {
  planId: 1,
  planName: "Study of livability on Mars",
  creator: {
    userId: 1,
    firstName: "John",
    lastName: "Doe",
  },
  funding: 100000.0,
  objective:
    "The objective of this project is to explore the feasibility of sustaining human life on Mars by analyzing environmental, biological, and technological factors. It aims to assess key challenges such as atmospheric conditions, resource availability, and habitat design. The study will also evaluate potential solutions for long-term human habitation and survival on the Martian surface.",
  startDate: new Date("2025-04-23"),
  endDate: new Date("2025-04-29"),
  planStatus: PlanStatus.CREATED,
  dataProcessingReq: {
    fileType: FileType.RAW,
    fileQuality: FileQuality.FINE,
    colorType: ColorType.COLOR,
    contrast: 1.2,
    brightness: 0.8,
    saturation: 0.1,
    highlight: 0.0,
    exposure: 0.75,
    shadows: 0.0,
    whites: 0.0,
    blacks: 0.0,
    luminance: 2.2,
    hue: 0.4,
  },
};
