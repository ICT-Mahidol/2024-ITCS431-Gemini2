import { deleteSciencePlan } from "@/api/delete_science_plan";
import { useMutation } from "@tanstack/react-query";
import React from "react";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const mutation = useMutation({
    mutationFn: deleteSciencePlan,
    onSuccess: () => {
      console.log("Deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting the science plan:", error);
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
