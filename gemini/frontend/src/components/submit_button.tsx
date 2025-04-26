import { submitSciencePlan } from '@/api/submit_science_plan';
import React from 'react';

type SubmitButtonProps = {
    id: string;
    onSubmit: () => void;
};
const SubmitButton: React.FC<SubmitButtonProps> = ({id, onSubmit }) => {
    const handleSubmit = async () => {
        try {
            const response = await submitSciencePlan(Number(id));
            if (response.ok) {
                onSubmit();
            } else {
                console.error('Failed to submit the science plan');
            }
        } catch (error) {
            console.error('Error submitting the science plan:', error);
        }
    };

    return (
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
        >
            Submit
        </button>
    );
}
export default SubmitButton;