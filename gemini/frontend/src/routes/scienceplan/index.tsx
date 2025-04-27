import { SciencePlanCard } from "@/components/science_plan_card";
import { SciencePlansMock } from "@/lib/mock_data";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateSciencePlanForm } from "@/components/forms/create_science_plan_form";
import { SciencePlan } from "@/lib/interfaces";
import { getSciencePlans } from "@/api/get_science_plans";
import { useQuery } from "@tanstack/react-query";
import { PlanStatus } from "@/lib/enums";
import { toast } from "sonner";

export const Route = createFileRoute("/scienceplan/")({
  // Ensure route path matches your file structure
  component: RouteComponent,
});

function RouteComponent() {
  // State for the selected status filter. Empty string means "All".
  const [selectedStatus, setSelectedStatus] = useState<PlanStatus | "ALL">(
    "ALL"
  );

  // Let useQuery fetch based on the selected status
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

  // Render loading state
  if (isPending) {
    // Optionally show previous data if available while loading new
    // const displayData = data ?? []; // Use fetched data or empty array if loading initially
    return <div>Loading...</div>; // Or a more sophisticated loading UI
  }

  // Render error state (using mock data as fallback)
  if (isError) {
    toast(`Error: ${error.message}`, {
      // Use error.message for a clearer error
      description:
        "Could not fetch science plans. Displaying mock data instead.",
    });

    // Your existing error fallback UI
    return (
      <main className="p-4">
        {" "}
        {/* Added padding */}
        <DashboardHeader
          onStatusChange={setSelectedStatus}
          currentStatus={selectedStatus}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <h2 className="col-span-full text-orange-600 font-semibold">
            Displaying Mock Data due to Error
          </h2>

          {SciencePlansMock.map((val) => (
            <SciencePlanCard
              key={val.planId}
              planId={val.planId}
              planName={val.planName}
              planStatus={val.planStatus}
            />
          ))}
        </div>
      </main>
    );
  }

  // Render success state using the data directly from useQuery
  return (
    <main className="p-4">
      {" "}
      {/* Added padding */}
      {/* Extracted header part to a sub-component for clarity */}
      <DashboardHeader
        onStatusChange={setSelectedStatus}
        currentStatus={selectedStatus}
      />
      {/* Render the actual fetched data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data && data.length > 0 ? (
          data.map((val) => (
            // Render component correctly
            <SciencePlanCard
              key={val.planId} // Add key prop
              planId={val.planId}
              planName={val.planName}
              planStatus={val.planStatus}
            />
          ))
        ) : (
          <p className="col-span-full text-muted-foreground">
            No science plans found matching the selected status.
          </p>
        )}
      </div>
    </main>
  );
}

// --- Helper Component for Header/Controls ---
interface DashboardHeaderProps {
  onStatusChange: (value: PlanStatus | "ALL") => void;
  currentStatus: PlanStatus | "ALL";
}

function DashboardHeader({
  onStatusChange,
  currentStatus,
}: Readonly<DashboardHeaderProps>) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 gap-4">
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold">Dashboard</span>
        {/* Select for Filtering */}
        <Select
          value={currentStatus} // Control the select value
          onValueChange={(value) => onStatusChange(value as PlanStatus | "ALL")} // Update state on change
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value={PlanStatus.SAVED}>SAVED</SelectItem>
            <SelectItem value={PlanStatus.TESTED}>TESTED</SelectItem>
            <SelectItem value={PlanStatus.SUBMITTED}>SUBMITTED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Create Plan Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Science Plan</Button>
        </DialogTrigger>
        <DialogContent className="min-w-fit md:min-w-[700px]">
          {" "}
          {/* Adjusted width */}
          <DialogHeader>
            <DialogTitle>Create Science Plan</DialogTitle>
            <DialogDescription>
              Create a new science plan by filling in the details.
            </DialogDescription>
          </DialogHeader>
          <CreateSciencePlanForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
