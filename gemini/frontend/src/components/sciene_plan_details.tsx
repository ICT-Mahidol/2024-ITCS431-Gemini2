import { Button } from "./ui/button";
import { SciencePlanDetails,DataProcessingRequirement } from "@/lib/interfaces";
export function sciencePlanDetailsUI(
  sciencePlan: SciencePlanDetails
) {
  const req: DataProcessingRequirement = sciencePlan.dataProcessingReq;
  return (
    <div className="flex flex-col gap-4 mx-3 my-3 border w-full ">
      <div>
        <div >Plan ID: {sciencePlan.planId}</div>
        <div>Plan Name: {sciencePlan.planName}</div>
        <div>Plan Status: {sciencePlan.planStatus}</div>
        <div>Plan Creator: {sciencePlan.creator.firstName} {sciencePlan.creator.lastName}</div>
        <div>Funding: {sciencePlan.funding}</div>f
        <div>Objective: {sciencePlan.objective}</div>
        <div>Plan Start Date: {sciencePlan.startDate.toISOString()}</div>
        <div>Plan End Date: {sciencePlan.endDate.toISOString()}</div>
        <div>Plan Status: {sciencePlan.planStatus}</div>
        <div>File Type: {req.fileType}</div>
        <div>File Quality: {req.fileQuality}</div>
        <div>Color Type: {req.colorType}</div>
        <div>Contrast: {req.contrast}</div>
        <div>Brightness: {req.brightness}</div>
        <div>Saturation: {req.saturation}</div>
        <div>Highlight: {req.highlight}</div>
        <div>Exposure: {req.exposure}</div>
        <div>Shadows: {req.shadows}</div>
        <div>Whites: {req.whites}</div>
        <div></div>
      </div>

    </div>
  );
}
