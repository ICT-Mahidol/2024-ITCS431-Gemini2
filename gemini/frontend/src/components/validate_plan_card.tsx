import { PlanStatus } from "@/lib/enums";
import { Link } from "@tanstack/react-router"; // Import Link for navigation
// Import action components defined above
import { DeletePlanAction, ValidatePlanAction } from "./plan_actions"; // Assuming they are in PlanActions.tsx

// Helper function remains the same
function StatusBackgroundColor(status: PlanStatus): string {
  switch (status) {
    case PlanStatus.SAVED:
      return "text-orange-700 bg-orange-100 dark:bg-orange-900/50 dark:text-orange-300";
    case PlanStatus.TESTED:
      return "text-blue-700 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300";
    case PlanStatus.SUBMITTED:
      return "text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-300";
    // Add other statuses if needed
    default:
      return "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300";
  }
}

export function ValidateSciencePlanCard({
  planId,
  planName,
  planStatus,
}: Readonly<{ planId: number; planName: string; planStatus: PlanStatus }>) {
  // Determine which action icon/component to show based on status

  return (
    <div className="p-4">
      <div className="group border dark:border-gray-700 shadow-sm rounded-lg p-4 flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
        {/* Wrap main content in a Link for navigation */}
        <Link
          to="/scienceplan/validate/$plan_id" // Adjust route if needed
          params={{ plan_id: planId.toString() }} // Ensure planId is string if needed by route
          className="flex-grow min-w-0 mr-4" // Allow link to grow and prevent text overflow issues
        >
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 dark:text-gray-400 font-medium text-sm w-6 flex-shrink-0">
                {String(planId).padStart(2, "0")}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${StatusBackgroundColor(
                  planStatus
                )}`}
              >
                {planStatus}
              </span>
            </div>
            <div className="text-gray-900 dark:text-gray-100 font-semibold text-base leading-tight truncate">
              {planName}
            </div>
          </div>
        </Link>

        {/* Right Side: Actions */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Always show delete action? Adjust logic if needed */}
          <DeletePlanAction planId={planId} />
          {/* Conditionally render the status-specific action */}
          <ValidatePlanAction planId={planId} />
        </div>
      </div>
    </div>
  );
}
