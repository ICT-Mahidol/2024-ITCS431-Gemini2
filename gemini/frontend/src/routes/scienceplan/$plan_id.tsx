import { createFileRoute } from "@tanstack/react-router";
import { getSciencePlanDetails } from "@/api/get_science_plan_details";
import { useQuery } from "@tanstack/react-query";
import { sciencePlanDetailsUI } from "@/components/sciene_plan_details";
import { SciencePlanDetailsMock } from "@/lib/mock_data";
import DeleteButton from "@/components/delete_button";
import SubmitButton from "@/components/submit_button";
import TestButton from "@/components/test_button";
import { PlanStatus } from "@/lib/enums";

export const Route = createFileRoute("/scienceplan/$plan_id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { plan_id } = Route.useParams();
  const planId = parseInt(plan_id);

  const { isPending, isError, data } = useQuery({
    queryKey: ["sciencePlanDetails"],
    queryFn: () => getSciencePlanDetails(planId),
  });
  if (isPending) {
    return (
      <main>
        <div>Fetching Science Plan Details ID: {planId}</div>
      </main>
    );
  }
  if (isError) {
    // use mock data if error
    return (
      <main>
        <div>{sciencePlanDetailsUI(SciencePlanDetailsMock)}</div>
        <DeleteButton id={planId.toString()} />
        {SciencePlanDetailsMock.status === PlanStatus.SAVED && (
          <TestButton id={plan_id} />
        )}
        {SciencePlanDetailsMock.status === PlanStatus.SUBMITTED && (
          <SubmitButton id={plan_id} />
        )}
      </main>
    );
  }

  return (
    <main>
      <div>{sciencePlanDetailsUI(data)}</div>
      <DeleteButton id={planId.toString()} />
      {data.status === PlanStatus.SAVED && (
        <TestButton id={planId.toString()} />
      )}
      {data.status === PlanStatus.TESTED && (
        <SubmitButton id={planId.toString()} />
      )}
    </main>
  );
}
