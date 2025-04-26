import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scienceplan/validate/$plan_id")({
  component: RouteComponent,
});

function RouteComponent() {
  //TODO: use loader to load data from plan_id
  const { plan_id } = Route.useParams();
  return <div>Plan ID: {plan_id}</div>;
}
