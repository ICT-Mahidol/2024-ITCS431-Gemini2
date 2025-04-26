import React from "react";

type DeleteButtonProps = {
    id: string;
    onDeleted?: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDeleted }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/science_plan/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                onDeleted?.();
            } else {
                console.error("Failed to delete the science plan");
            }
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