import { testSciencePlan } from '@/api/test_science_plan';
import React from 'react';

type TestButtonProps = {
    id: string;
    onTest: () => void;
};
const TestButton: React.FC<TestButtonProps> = ({ id, onTest }) => {
    const handleTest = async () => {
        try {
            const response = await testSciencePlan(Number(id));
        } catch (error) {
            console.error('Error testing the science plan:', error);
        }
    };

    return (
        <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleTest}
        >
            Test
        </button>
    );
};
export default TestButton;