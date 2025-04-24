export async function validateSciencePlan(planID: number) {
  const apiUrl = import.meta.env.VITE_API_URL;
  return await fetch(apiUrl + "/scienceplan/validate", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(planID),
  });
}
