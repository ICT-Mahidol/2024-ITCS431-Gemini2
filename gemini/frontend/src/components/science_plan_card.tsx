import { PlanStatus } from "@/lib/enums";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";
import { FiTrash2, FiChevronRight } from "react-icons/fi";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
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
      return (
        <Button className="bg-transparent hover:bg-blue-700">
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
      );
    case "TESTED":
      return (
        <Button className="bg-transparent hover:bg-blue-700">
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
      );
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
        <div className="bg-linear-to-r from-cyan-100 to-blue-300 border shadow-sm rounded-2xl p-4 flex justify-between items-center">
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
            {deleteSciencePlanDialog()}
            {getStatusIcon(planStatus)}
          </div>
        </div>
      </div>
    </div>
  );
}

function deleteSciencePlanDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent hover:bg-blue-700">
          <FiTrash2 className="text-red-600 w-6 h-6" />
        </Button>
      </AlertDialogTrigger>

      {/* ✅ Portal makes it render outside of parent container */}
      <AlertDialogPortal>
        <AlertDialogOverlay className="fixed inset-0 bg-black/30 z-40" />

        <AlertDialogContent className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to delete this science plan?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="text-gray-500">
                This action cannot be undone. It will permanently delete this
                plan.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button variant="secondary">Cancle</Button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button variant="destructive">Delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
