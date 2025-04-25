import { PlanStatus } from "@/lib/enums";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import {
  IconBrandTelegram,
  IconFlaskFilled,
  IconTrashFilled,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { testSciencePlan } from "@/api/test_science_plan";
import { submitSciencePlan } from "@/api/submit_science_plan";
import { deleteSciencePlan } from "@/api/delete_science_plan";

function StatusBackgroundColor(status: PlanStatus): string {
  switch (status) {
    case "CREATED":
      return "text-orange-700 bg-orange-100";
    case "TESTED":
      return "text-blue-700 bg-blue-100";
    case "SUBMITTED":
      return "text-green-700 bg-green-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
}

function getStatusIcon(status: PlanStatus, planId: number) {
  switch (status) {
    case "CREATED":
      return <TestSciencePlanIcon />;
    case "TESTED":
      return <SubmitSciencePlanIcon planId={planId} />;
    case "SUBMITTED":
      return <div></div>;
    default:
      return null;
  }
}

export function SciencePlanCard(
  planId: number,
  planName: string,
  planStatus: PlanStatus
) {
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        {/* <a href={`${apiUrl}/scienceplan?planId=${planId}`} target="_blank"> */}
        <div className="group border shadow-sm rounded-2xl p-4 flex justify-between items-center bg-gradient-to-r from-cyan-100 to-blue-300 hover:from-blue-300 hover:to-blue-500 transition-colors duration-300">
          {/* Left Side: ID + Content */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-black font-medium text-sm w-6">
                {String(planId).padStart(2, "0")}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${StatusBackgroundColor(
                  planStatus
                )}`}
              >
                {planStatus}
              </span>
            </div>
            <div className="text-black font-bold text-lg leading-tight truncate max-w-xl flex">
              {planName}
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center space-x-3">
            {DeleteSciencePlanDialogConfirm()}
            <div>{getStatusIcon(planStatus, planId)}</div>
          </div>
        </div>
        {/* </a> */}
      </div>
    </div>
  );
}

// Dialog popup below VVVVVV
function DeleteSciencePlanDialogConfirm() {
  const mutation = useMutation({
    mutationFn: deleteSciencePlan,
    onSuccess: (data) => {
      console.log("Science plan submitted successfully:", data);
    },
    onError: (error) => {
      console.error("Error submitting science plan:", error);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-red-300">
          <IconTrashFilled color="red" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 z-40" />

        <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Are you sure to delete this science plan?</DialogTitle>
            <DialogDescription>
              <span className="text-gray-500">
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                mutation.mutate();
              }}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function SubmitSciencePlanIcon({ planId }: { planId: number }) {
  const mutation = useMutation({
    mutationFn: submitSciencePlan,
    onSuccess: (data) => {
      console.log("Science plan submitted successfully:", data);
    },
    onError: (error) => {
      console.error("Error submitting science plan:", error);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-blue-400">
          <div className="text-blue-600">
            <IconBrandTelegram />
          </div>
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 z-40" />

        <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Are you sure to submit this science plan?</DialogTitle>
            <DialogDescription>
              <span className="text-gray-500">
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancle</Button>
            </DialogClose>
            <Button
              onClick={() => {
                mutation.mutate(planId);
              }}
              variant="destructive"
              className="bg-blue-500 hover:bg-blue-700"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function TestSciencePlanIcon() {
  const mutation = useMutation({
    mutationFn: testSciencePlan,
    onSuccess: (data) => {
      console.log("Science plan tested successfully:", data);
    },
    onError: (error) => {
      console.error("Error testing science plan:", error);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-purple-300">
          <div className="text-purple-600">
            <IconFlaskFilled />
          </div>
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 z-40" />

        <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Are you sure to test this science plan?</DialogTitle>
            <DialogDescription>
              <span className="text-gray-500">
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                mutation.mutate();
              }}
              variant="destructive"
              className="bg-purple-600 hover:bg-purple-800"
            >
              Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
