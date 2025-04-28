import { validateSciencePlan } from "@/api/validate_science_plan";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { toast } from "sonner";

type SubmitButtonProps = {
  id: string;
};
const ValidateButton: React.FC<SubmitButtonProps> = ({ id }) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: validateSciencePlan,
    onSuccess: () => {
      toast.success("Science plan validated successfully");
    },
    onError: (error) => {
      toast.error(`Error validating science plan: ${error.message}`);
    },
  });
  const handleValidate = async () => {
    mutation.mutate(Number(id));
    navigate({
      to: "/scienceplan/validate",
    });
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded"
      onClick={handleValidate}
    >
      Validate
    </button>
  );
};
export default ValidateButton;
