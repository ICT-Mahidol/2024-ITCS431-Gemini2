import { deleteSciencePlan } from "@/api/delete_science_plan";
import React from "react";

type DeleteButtonProps = {
    id: string;
    onDeleted?: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDeleted }) => {
    const handleDelete = async () => {
        try {
            const response = await deleteSciencePlan(Number(id));
            
        } catch (error) {
            console.error("Error deleting the science plan:", error);
        }
    };

    return (
        <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
        >
            Delete
        </button>
    );
}

export default DeleteButton;