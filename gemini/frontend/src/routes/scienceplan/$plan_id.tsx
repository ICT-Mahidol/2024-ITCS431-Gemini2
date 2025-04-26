import { createFileRoute } from "@tanstack/react-router";
import { getSciencePlanDetails } from "@/api/get_science_plan_details";
import { useQuery } from "@tanstack/react-query";
import { sciencePlanDetailsUI } from "@/components/sciene_plan_details";
import { SciencePlanDetailsMock } from "@/lib/mock_data";
import DeleteButton from "@/components/delete_button";
import SubmitButton from "@/components/submit_button";


export const Route = createFileRoute("/scienceplan/$plan_id")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: use loader to load data from plan_id
  const { plan_id } = Route.useParams();
  var planId = parseInt(plan_id);

  const {isPending, isError, data, error} = useQuery({
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
    return (
      <main>
        <div>{sciencePlanDetailsUI(SciencePlanDetailsMock)}</div>
        <DeleteButton id={planId.toString()} onDeleted={() => {
          console.log("Deleted successfully");
        }} />
        <SubmitButton id={planId.toString()} onSubmit={() => {
          console.log("Submitted successfully");
        }} />
      </main>
    );
  }

  return (
    <main>
      {sciencePlanDetailsUI(data)}
    </main>
  );
}
