async function updateQuestAPI(values, questId, handleResponse, handleError) {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND2_BASE_URL;

    const endpoint = `/quest/${questId}`;

    const url = `${baseUrl}${endpoint}`;

    const today = new Date().toLocaleDateString("en-CA");
    const requestBody = JSON.stringify({
      name: values.name,
      completedDays: {
        ...values.completedDays,
        [today]: 1, // Only updating today’s quest status
      },
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
