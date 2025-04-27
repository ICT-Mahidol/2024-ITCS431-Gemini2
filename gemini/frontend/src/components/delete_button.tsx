import { deleteSciencePlan } from "@/api/delete_science_plan";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const mutation = useMutation({
    mutationFn: deleteSciencePlan,
    onSuccess: () => {
      toast.success("Science plan deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting science plan: ${error.message}`);
    },
  });
  const handleDelete = async () => {
    mutation.mutate(Number(id));
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
