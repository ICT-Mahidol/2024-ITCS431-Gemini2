import { submitSciencePlan } from "@/api/submit_science_plan";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

type SubmitButtonProps = {
  id: string;
};
const SubmitButton: React.FC<SubmitButtonProps> = ({ id }) => {
  const mutation = useMutation({
    mutationFn: submitSciencePlan,
    onSuccess: () => {
      toast.success("Science plan submitted successfully");
    },
    onError: (error) => {
      toast.error(`Error submitting science plan: ${error.message}`);
    },
  });
  const handleSubmit = async () => {
    mutation.mutate(Number(id));
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleSubmit}
    >
      Submit
    </button>
  );
};
export default SubmitButton;
