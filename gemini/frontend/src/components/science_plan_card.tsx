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
import { FiTrash2, FiChevronRight } from "react-icons/fi";
import { Button } from "./ui/button";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogPortal,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogOverlay,
} from "./ui/alert-dialog";
// const apiUrl = process.env.VITE_API_URL;
const apiUrl = "http://localhost:8080/api/v1";

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

function getStatusIcon(status: PlanStatus) {
  switch (status) {
    case "CREATED":
      return validateSciencePlanDialog();
    case "TESTED":
      return submitSciencePlanDialog();
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
            {deleteSciencePlanDialogConfirm()}
            <div>{getStatusIcon(planStatus)}</div>
          </div>
        </div>
        {/* </a> */}
      </div>
    </div>
  );
}

// Dialog popup below VVVVVV
function deleteSciencePlanDialogConfirm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-red-300">
          <FiTrash2 className="text-red-600 w-6 h-6" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 z-40" />

        <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Are you sure to delete this science plan?</DialogTitle>
            <DialogDescription>
              <span className="text-gray-500">
                This action cannot be undone. It will permanently delete this
                plan.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancle</Button>
            </DialogClose>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function submitSciencePlanDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-blue-400">
          <div className="text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-send"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
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
                This action cannot be undone. It will submit this science plan.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancle</Button>
            </DialogClose>
            <Button
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

function validateSciencePlanDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-purple-300">
          <div className="text-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-flask-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6.1 15h11.8" />
              <path d="M14 3v7.342a6 6 0 0 1 1.318 10.658h-6.635a6 6 0 0 1 1.317 -10.66v-7.34h4z" />
              <path d="M9 3h6" />
            </svg>
          </div>
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 z-40" />

        <DialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <DialogHeader>
            <DialogTitle>
              Are you sure to validate this science plan?
            </DialogTitle>
            <DialogDescription>
              <span className="text-gray-500">
                This action cannot be undone. It will validation will be
                completed after validation.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancle</Button>
            </DialogClose>
            <Button
              variant="destructive"
              className="bg-purple-600 hover:bg-purple-800"
            >
              Validate
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
