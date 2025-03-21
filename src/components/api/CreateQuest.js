async function createQuestAPI(values, handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const endpoint = "/quest";

    const url = `${baseUrl}${endpoint}`;
    console.log(url);

    const requestBody = JSON.stringify({
      name: values.name,
      completedDays: values.completedDays,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "failed to create task");
    }

    handleResponse(data);
  } catch (error) {
    handleError(error.message);
  } finally {
    setLoading(false);
  }
}

export default createQuestAPI;
