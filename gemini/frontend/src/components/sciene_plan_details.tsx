import {
  SciencePlanDetails,
  DataProcessingRequirement,
} from "@/lib/interfaces";
export function sciencePlanDetailsUI(sciencePlan: SciencePlanDetails) {
  const req: DataProcessingRequirement[] = sciencePlan.dataProcRequirements;
  console.log(req);
  return (
    // this is vibe code! cr. Gemini 2.5 DONT ASK ME WHAT IS IT
    <div className="flex flex-col gap-4 p-6 mx-3 my-3 border border-gray-300 rounded-2xl shadow-md bg-white w-full">
      <div className="text-2xl font-bold text-indigo-600 mb-4">
        Science Plan Details
      </div>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div>
          <span className="font-semibold">Plan ID:</span> {sciencePlan.planNo}
        </div>
        <div>
          <span className="font-semibold">Plan Name:</span>{" "}
          {sciencePlan.planName}
        </div>
        <div>
          <span className="font-semibold">Plan Status:</span>
          <span
            className={`ml-2 px-2 py-1 rounded-lg text-white text-sm
              ${
                sciencePlan.status === "SUBMITTED"
                  ? "bg-green-500"
                  : sciencePlan.status === "TESTED"
                    ? "bg-blue-500"
                    : sciencePlan.status === "SAVED"
                      ? "bg-yellow-500"
                      : sciencePlan.status === "VALIDATED"
                        ? "bg-gray-400"
                        : "bg-gray-400"
              }
              `}
          >
            {sciencePlan.status}
          </span>
        </div>
        <div>
          <span className="font-semibold">Plan Creator:</span>{" "}
          {sciencePlan.creator}
        </div>
        <div>
          <span className="font-semibold">Funding (USD):</span> $
          {sciencePlan.fundingInUSD}
        </div>
        <div>
          <span className="font-semibold">Objective:</span>{" "}
          {sciencePlan.objectives}
        </div>
        <div>
          <span className="font-semibold">Start Date:</span>{" "}
          {String(sciencePlan.startDate)}
        </div>
        <div>
          <span className="font-semibold">End Date:</span>{" "}
          {String(sciencePlan.endDate)}
        </div>
        <div>
          <span className="font-semibold">Star System</span>{" "}
          {String(sciencePlan.starSystem)}
        </div>
        <div>
          <span className="font-semibold">Telescope Location</span>{" "}
          {String(sciencePlan.telescopeLocation)}
        </div>
      </div>

      {req.length > 0 && (
        <div className="mt-6">
          <div className="text-xl font-semibold text-indigo-500 mb-2">
            File Requirements
          </div>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            {req.map((val, index) => (
              <div
                key={index}
                className="border p-4 rounded-xl bg-gray-50 shadow-sm"
              >
                <div>
                  <span className="font-semibold">File Type:</span>{" "}
                  {val.fileType}
                </div>
                <div>
                  <span className="font-semibold">File Quality:</span>{" "}
                  {val.fileQuality}
                </div>
                <div>
                  <span className="font-semibold">Color Type:</span>{" "}
                  {val.colorType}
                </div>
                <div>
                  <span className="font-semibold">Contrast:</span>{" "}
                  {val.contrast}
                </div>
                <div>
                  <span className="font-semibold">Brightness:</span>{" "}
                  {val.brightness}
                </div>
                <div>
                  <span className="font-semibold">Saturation:</span>{" "}
                  {val.saturation}
                </div>
                <div>
                  <span className="font-semibold">Highlight:</span>{" "}
                  {val.highlights}
                </div>
                <div>
                  <span className="font-semibold">Exposure:</span>{" "}
                  {val.exposure}
                </div>
                <div>
                  <span className="font-semibold">Shadows:</span> {val.shadows}
                </div>
                <div>
                  <span className="font-semibold">Whites:</span> {val.whites}
                </div>
                <div>
                  <span className="font-semibold">Blacks:</span> {val.blacks}
                </div>
                <div>
                  <span className="font-semibold">Luminance:</span>{" "}
                  {val.luminance}
                </div>
                <div>
                  <span className="font-semibold">Hue:</span> {val.hue}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
