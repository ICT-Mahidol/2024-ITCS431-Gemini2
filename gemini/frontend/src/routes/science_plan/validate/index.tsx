import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/science_plan/validate/")({
  component: RouteComponent,
  // TODO: use beforeLoad for role authorization
});

function RouteComponent() {
  // TODO: validate ui
  return <div>Hello "/science_plan/validate/"!</div>;
}
