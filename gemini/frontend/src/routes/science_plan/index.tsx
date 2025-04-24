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

export const Route = createFileRoute("/science_plan/")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: dropdown menu for status selection

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
  //       {/* DROP DOWN */}
  //       <div>
  //         {SciencePlansMock.map((val) => {
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
  //       {/* DROP DOWN */}
  //       {data.map((val) => {
  //         return SciencePlanCard(val.planId, val.planName, val.planStatus);
  //       })}
  //     </div>
  //   </main>
  // );

  return (
    <main>
      <div className="flex items-center justify-between pb-3">
        <span className="ml-4">Dashboard</span>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">Create Science Plan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Science Plan</DialogTitle>
              <DialogDescription>
                Create a new science plan by filling in the details.
              </DialogDescription>
            </DialogHeader>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Plan Name</Label>
              <Input type="text" id="email" placeholder="Plan Name" />

              <Label htmlFor="email">Funding</Label>
              <Input
                type="number"
                step="0.01"
                id="email"
                placeholder="Funding"
              />

              <Label htmlFor="email">Objective</Label>
              <Input type="text" id="email" placeholder="Objective" />

              <Label htmlFor="email">Start Date</Label>
              <Input type="date" id="email" placeholder="Objective" />

              <Label htmlFor="email">End Date</Label>
              <Input type="date" id="email" placeholder="Objective" />

              <span className="mt-2">
                <Label htmlFor="color-type">Color Type</Label>
                {"Color  "}
                <Switch id="color-type" className="mt-2" />
                {"  Black&White"}
              </span>
            </div>
            <Button variant="outline">Submit</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex ml-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CREATED">CREATED</SelectItem>
            <SelectItem value="SUBMITTED">SUBMITTED</SelectItem>
            <SelectItem value="TESTED">TESTED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        {SciencePlansMock.map((val) => {
          return SciencePlanCard(val.planId, val.planName, val.planStatus);
        })}
      </div>
    </main>
  );
}
