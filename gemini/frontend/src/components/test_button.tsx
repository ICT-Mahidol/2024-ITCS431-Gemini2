import { testSciencePlan } from "@/api/test_science_plan";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

type TestButtonProps = {
  id: string;
};

const TestButton: React.FC<TestButtonProps> = ({ id }) => {
  const mutation = useMutation({
    mutationFn: testSciencePlan,
    onSuccess: () => {
      toast.success("Science plan tested successfully");
    },
    onError: (error) => {
      toast.error(`Error testing science plan ${error.message}`);
    },
  });
  const handleTest = () => {
    mutation.mutate(Number(id));
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
