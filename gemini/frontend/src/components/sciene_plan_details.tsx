import { Button } from "./ui/button";
import { SciencePlanDetails } from "@/lib/interfaces";
export function sciencePlanDetailsUI(
  sciencePlan: SciencePlanDetails
) {
  return (
    <div className="flex flex-col gap-4 mx-3 my-3 border w-full ">
      <div>
        <div className="">Plan ID: {sciencePlan.planId}</div>
        <div>Plan Name: {sciencePlan.planName}</div>
        <div>Plan Status: {sciencePlan.planStatus}</div>
        <div>Plan Creator: {sciencePlan.creator.firstName} {sciencePlan.creator.lastName}</div>
        <div>Funding: {sciencePlan.funding}</div>
        <div>Objective: {sciencePlan.objective}</div>
        <div>Plan Start Date: {sciencePlan.startDate.toISOString()}</div>
        <div>Plan End Date: {sciencePlan.endDate.toISOString()}</div>
        <div>Plan Status: {sciencePlan.planStatus}</div>
      </div>

    </div>
  );
}
