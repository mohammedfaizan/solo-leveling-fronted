async function updateQuestAPI(values, questId, handleResponse, handleError) {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const endpoint = `/quest/${questId}`;

    const url = `${baseUrl}${endpoint}`;

    const requestBody = JSON.stringify({
      name: values.name,
      completedDays: values.completedDays,
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "quest was not updated");
    }

    handleResponse(data);
  } catch (error) {
    handleError(error.message);
  }
}
export default updateQuestAPI;
