import { getSciencePlans } from "@/api/get_science_plans";
import { ValidateSciencePlanCard } from "@/components/validate_plan_card";
import { CookieHelper } from "@/lib/cookie_helper";
import { PlanStatus, Role } from "@/lib/enums";
import { SciencePlan } from "@/lib/interfaces";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/scienceplan/validate/")({
  component: RouteComponent,
  // REF: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
  beforeLoad: async ({ location }) => {
    const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE); // NOTE: change cookie name

    if (authCookie.role !== Role.SCIENCE_OBSERVER) {
      throw redirect({
        to: "/scienceplan",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});

function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 gap-4">
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold">Dashboard</span>
      </div>
    </div>
  );
}

function RouteComponent() {
  // return <div>Hello "/science_plan/validate/"!</div>;

  const [selectedStatus, setSelectedStatus] = useState<PlanStatus | "ALL">(
    "ALL"
  );
  const { isPending, isError, data, error } = useQuery<SciencePlan[], Error>({
    // Add type hints for data/error
    // IMPORTANT: Include selectedStatus in the queryKey!
    queryKey: ["sciencePlans", selectedStatus],
    queryFn: () => {
      // Determine the status to pass to the API function
      const statusToFetch: PlanStatus | null =
        selectedStatus === "ALL" ? null : selectedStatus;
      return getSciencePlans(statusToFetch);
    },
    // Keep previous data while fetching new data for a smoother UI
    // placeholderData: (previousData) => previousData, // TanStack Query v5+
    // keepPreviousData: true, // TanStack Query v4
  });

  if (isPending) {
    // Optionally show previous data if available while loading new
    // const displayData = data ?? []; // Use fetched data or empty array if loading initially
    return <div></div>; // Or a more sophisticated loading UI
  }

  if (isError) {
    <main>{error.message || "Internal server error"}</main>;
  }

  console.log(setSelectedStatus);

  return (
    <div>
      <main className="p-4">
        {" "}
        {/* Added padding */}
        <DashboardHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data && data.length > 0 ? (
            data
              .filter((val) => val.planStatus === "TESTED") // Filter for planStatus="TESTED"
              .map((val) => (
                // Render component correctly
                <ValidateSciencePlanCard
                  key={val.planId} // Add key prop
                  planId={val.planId}
                  planName={val.planName}
                  planStatus={val.planStatus}
                />
              ))
          ) : (
            <p className="col-span-full text-muted-foreground">
              No science plans found to be validated.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
