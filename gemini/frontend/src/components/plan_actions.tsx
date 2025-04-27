import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  IconBrandTelegram,
  IconCopyCheck,
  IconFlaskFilled,
  IconTrashFilled,
} from "@tabler/icons-react";
import { testSciencePlan } from "@/api/test_science_plan";
import { submitSciencePlan } from "@/api/submit_science_plan";
import { deleteSciencePlan } from "@/api/delete_science_plan";
import { ActionConfirmationDialog } from "@/components/action_confirmation_dialog"; // Adjust path
import { toast } from "sonner"; // Import toast for notifications
import { validateSciencePlan } from "@/api/validate_science_plan";

// --- Delete Action ---
export function DeletePlanAction({ planId }: Readonly<{ planId: number }>) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteSciencePlan(planId), // Pass planId correctly if API expects it
    onSuccess: () => {
      toast.success(`Science plan ${planId} deleted successfully.`);
      queryClient.invalidateQueries({ queryKey: ["sciencePlans"] }); // Invalidate list query
    },
    onError: (error) => {
      toast.error(`Error deleting science plan: ${error.message}`);
      console.error("Error deleting science plan:", error);
    },
  });

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-red-100 text-red-600 cursor-pointer"
    >
      <IconTrashFilled size={20} />
      <span className="sr-only">Delete Plan</span>
    </Button>
  );

  return (
    <ActionConfirmationDialog
      triggerButton={trigger}
      dialogTitle="Are you sure?"
      dialogDescription="This action cannot be undone. This will permanently delete the science plan."
      confirmAction={() => mutation.mutate()}
      confirmButtonText="Delete"
      confirmButtonVariant="destructive"
      isPending={mutation.isPending}
    />
  );
}

// --- Submit Action ---
export function SubmitPlanAction({ planId }: Readonly<{ planId: number }>) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => submitSciencePlan(planId),
    onSuccess: () => {
      toast.success(`Science plan ${planId} submitted successfully.`);
      queryClient.invalidateQueries({ queryKey: ["sciencePlans"] });
      // Optional: Invalidate specific plan details if needed
      // queryClient.invalidateQueries({ queryKey: ["sciencePlanDetails", planId] });
    },
    onError: (error) => {
      toast.error(`Error submitting science plan: ${error.message}`);
      console.error("Error submitting science plan:", error);
    },
  });

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-blue-100 text-blue-600 cursor-pointer"
    >
      <IconBrandTelegram size={20} />
      <span className="sr-only">Submit Plan</span>
    </Button>
  );

  return (
    <ActionConfirmationDialog
      triggerButton={trigger}
      dialogTitle="Confirm Submission"
      dialogDescription="Are you sure you want to submit this science plan? Its status will change to SUBMITTED."
      confirmAction={() => mutation.mutate()}
      confirmButtonText="Submit"
      confirmButtonVariant="default" // Use default button style
      confirmButtonClassName="bg-blue-600 hover:bg-blue-700" // Custom class if needed
      isPending={mutation.isPending}
    />
  );
}

// --- Test Action ---
export function TestPlanAction({ planId }: Readonly<{ planId: number }>) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => testSciencePlan(planId), // Assuming testSciencePlan takes planId
    onSuccess: () => {
      toast.success(`Science plan ${planId} tested successfully.`);
      queryClient.invalidateQueries({ queryKey: ["sciencePlans"] });
    },
    onError: (error) => {
      toast.error(`Error testing science plan: ${error.message}`);
      console.error("Error testing science plan:", error);
    },
  });

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-purple-100 text-purple-600 cursor-pointer"
    >
      <IconFlaskFilled size={20} />
      <span className="sr-only">Test Plan</span>
    </Button>
  );

  return (
    <ActionConfirmationDialog
      triggerButton={trigger}
      dialogTitle="Confirm Test Run"
      dialogDescription="Are you sure you want to test this science plan? Its status will change to TESTED."
      confirmAction={() => mutation.mutate()}
      confirmButtonText="Test"
      confirmButtonVariant="default"
      confirmButtonClassName="bg-purple-600 hover:bg-purple-700"
      isPending={mutation.isPending}
    />
  );
}

// VADILATE ACTION
export function ValidatePlanAction({ planId }: Readonly<{ planId: number }>) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => validateSciencePlan(planId), // Assuming testSciencePlan takes planId
    onSuccess: () => {
      toast.success(`Science plan ${planId} validated successfully.`);
      queryClient.invalidateQueries({ queryKey: ["sciencePlans"] });
    },
    onError: (error) => {
      toast.error(`Error validate science plan: ${error.message}`);
      console.error("Error validate science plan:", error);
    },
  });

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-purple-100 text-green-600 cursor-pointer"
    >
      <IconCopyCheck stroke={2} />
      <span className="sr-only">Test Plan</span>
    </Button>
  );

  return (
    <ActionConfirmationDialog
      triggerButton={trigger}
      dialogTitle="Confirm Validate plan"
      dialogDescription="Are you sure you want to test this science plan? Its status will change to TESTED."
      confirmAction={() => mutation.mutate()}
      confirmButtonText="Validate"
      confirmButtonVariant="default"
      confirmButtonClassName="bg-green-600 hover:bg-purple-700"
      isPending={mutation.isPending}
    />
  );
}
