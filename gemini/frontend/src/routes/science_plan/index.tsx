import { getSciencePlans } from "@/api/get_science_plans";
import { SciencePlanCard } from "@/components/science_plan_card";
import { SciencePlansMock } from "@/lib/mock_data";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { CreateSciencePlanForm } from "@/components/forms/create_science_plan_form";

export const Route = createFileRoute("/science_plan/")({
  component: RouteComponent,
});

function RouteComponent() {
  //TODO: dropdown menu for status selection

  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ["sciencePlans"],
  //   queryFn: () => getSciencePlans(null), // NOTE: change null to selected status from dropdown
  // });

  // if (isPending) {
  //   return "Loading...";
  // }

  // if (isError) {
  //   toast(`Error: ${error}`, {
  //     description: "Switch to use mock data instead",
  //   });

  //   return (
  //     <main>
  //       <MainComponent />
  //       <div>
  //         {SciencePlansMock.map((val) => {
  //           // use mock instead for DEV
  //           return SciencePlanCard(val.planId, val.planName, val.planStatus);
  //         })}
  //       </div>
  //     </main>
  //   );
  // }

  // // TODO: science plan page ui

  // return (
  //   <main>
  //     <div>
  //       <MainComponent />
  //       {data.map((val) => {
  //         return SciencePlanCard(val.planId, val.planName, val.planStatus);
  //       })}
  //     </div>
  //   </main>
  // );
  const [selectedStatus, setSelectedStatus] = useState("");
  return (
    <main>
      <div>
        <MainComponent onStatusChange={setSelectedStatus} />
        {SciencePlansMock.filter(
          (val) =>
            selectedStatus === "ALL" ||
            !selectedStatus ||
            val.planStatus === selectedStatus
        ).map((val) =>
          SciencePlanCard(val.planId, val.planName, val.planStatus)
        )}
      </div>
    </main>
  );
}

function MainComponent({ onStatusChange }) {
  return (
    <main>
      <div className="flex items-center justify-between pb-3">
        <span className="ml-4">Dashboard</span>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">Create Science Plan</Button>
          </DialogTrigger>
          <DialogContent className="min-w-2xl">
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

      <div className="flex ml-4">
        <Select onValueChange={(value) => onStatusChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value="CREATED">CREATED</SelectItem>
            <SelectItem value="SUBMITTED">SUBMITTED</SelectItem>
            <SelectItem value="TESTED">TESTED</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </main>
  );
}
