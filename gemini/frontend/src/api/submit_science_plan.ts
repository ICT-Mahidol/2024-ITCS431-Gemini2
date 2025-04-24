export async function submitSciencePlan(planId: number) {
  const apiUrl = import.meta.env.VITE_API_URL;
  return await fetch(apiUrl + "/scienceplan/submit", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(planId),
  });
}
