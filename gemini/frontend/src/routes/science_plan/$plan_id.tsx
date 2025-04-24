import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/science_plan/$plan_id")({
  component: RouteComponent,
});

function RouteComponent() {
  // use loader to load data from plan_id
  const { plan_id } = Route.useParams();
  return <div>Plan : {plan_id}</div>;
}
