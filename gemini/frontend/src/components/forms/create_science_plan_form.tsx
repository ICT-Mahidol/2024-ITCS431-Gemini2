import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@radix-ui/react-switch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function CreateSciencePlanForm() {
  // TODO
  return (
    <main>
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
            <Input type="number" step="0.01" id="email" placeholder="Funding" />

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
    </main>
  );
}
