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

export const Route = createFileRoute("/scienceplan/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedStatus, setSelectedStatus] = useState("");

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
  //       <MainComponent onStatusChange={setSelectedStatus} />
  //       <div>
  //         {SciencePlansMock.map((val) => {
  //           // use mock instead for DEV
  //           return SciencePlanCard(val.planId, val.planName, val.planStatus);
  //         })}
  //       </div>
  //     </main>
  //   );
  // }

  // return (
  //   <main>
  //     <div>
  //       <MainComponent onStatusChange={setSelectedStatus} />
  //       {data.map((val) => {
  //         return SciencePlanCard(val.planId, val.planName, val.planStatus);
  //       })}
  //     </div>
  //   </main>
  // );

  // use this for DEV for faster don't need loading :)
  // TODO: science plan page ui
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

function MainComponent({
  onStatusChange,
}: Readonly<{ onStatusChange: (status: string) => void }>) {
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
