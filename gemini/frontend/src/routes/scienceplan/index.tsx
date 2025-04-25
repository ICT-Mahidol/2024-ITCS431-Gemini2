import { getSciencePlans } from "@/api/get_science_plans";
import { SciencePlanCard } from "@/components/science_plan_card";
import { SciencePlansMock } from "@/lib/mock_data";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/scienceplan/")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: dropdown menu for status selection
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["sciencePlans"],
    queryFn: () => getSciencePlans(null), // NOTE: change null to selected status from dropdown
  });

  if (isPending) {
    return "Loading...";
  }

  if (isError) {
    toast(`Error: ${error}`, {
      description: "Switch to use mock data instead",
    });

    return (
      <main>
        <div>
          {SciencePlansMock.map((val) => {
            return SciencePlanCard(val.planId, val.planName, val.planStatus);
          })}
        </div>
      </main>
    );
  }

  // TODO: science plan page ui
  return (
    <main>
      <div>
        {data.map((val) => {
          return SciencePlanCard(val.planId, val.planName, val.planStatus);
        })}
      </div>
    </main>
  );
}
