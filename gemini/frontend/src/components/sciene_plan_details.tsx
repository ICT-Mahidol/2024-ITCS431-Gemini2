import {
  SciencePlanDetails,
  DataProcessingRequirement,
} from "@/lib/interfaces";
export function sciencePlanDetailsUI(sciencePlan: SciencePlanDetails) {
  const req: DataProcessingRequirement[] = sciencePlan.dataProcRequirements;
  console.log(req);
  return (
    <div className="flex flex-col gap-4 mx-3 my-3 border w-full ">
      <div>
        <div>Plan ID: {sciencePlan.planId}</div>
        <div>Plan Name: {sciencePlan.planName}</div>
        <div>Plan Status: {sciencePlan.planStatus}</div>
        <div>Plan Creator: {sciencePlan.creator}</div>
        <div>Funding: {sciencePlan.funding}</div>
        <div>Objective: {sciencePlan.objective}</div>
        <div>Plan Start Date: {String(sciencePlan.startDate)}</div>
        <div>Plan End Date: {String(sciencePlan.endDate)}</div>
        <div>Plan Status: {sciencePlan.planStatus}</div>
        {req.map((val) => (
          <div>
            <div>File Type: {val.fileType}</div>
            <div>File Quality: {val.fileQuality}</div>
            <div>Color Type: {val.colorType}</div>
            <div>Contrast: {val.contrast}</div>
            <div>Brightness: {val.brightness}</div>
            <div>Saturation: {val.saturation}</div>
            <div>Highlight: {val.highlight}</div>
            <div>Exposure: {val.exposure}</div>
            <div>Shadows: {val.shadows}</div>
            <div>Whites: {val.whites}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
