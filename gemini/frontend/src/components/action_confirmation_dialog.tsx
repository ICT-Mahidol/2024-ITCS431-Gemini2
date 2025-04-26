import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose, // Import DialogClose from ui/dialog if it exists there
} from "@/components/ui/dialog"; // Use your UI library's Dialog components
import { Button } from "@/components/ui/button";
import React from "react";

interface ActionConfirmationDialogProps {
  triggerButton: React.ReactElement; // The button/icon that opens the dialog
  dialogTitle: string;
  dialogDescription: string | React.ReactElement;
  confirmAction: () => void; // Function to call on confirmation
  confirmButtonText: string;
  confirmButtonVariant?: React.ComponentProps<typeof Button>["variant"];
  confirmButtonClassName?: string;
  isPending?: boolean; // Optional: To disable button during mutation
  children?: never; // Enforce no direct children passed this way
}

export function ActionConfirmationDialog({
  triggerButton,
  dialogTitle,
  dialogDescription,
  confirmAction,
  confirmButtonText,
  confirmButtonVariant = "destructive", // Default to destructive, override as needed
  confirmButtonClassName,
  isPending = false,
}: Readonly<ActionConfirmationDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      {/* Use DialogContent etc. from your UI library */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* Ensure DialogClose is imported correctly */}
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant={confirmButtonVariant}
            className={confirmButtonClassName}
            onClick={confirmAction}
            disabled={isPending}
          >
            {isPending ? "Processing..." : confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
