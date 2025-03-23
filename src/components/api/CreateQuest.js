async function createQuestAPI(values, handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_BACKEND2_BASE_URL;

    const endpoint = "/quest";

    const url = `${baseUrl}${endpoint}`;
    console.log(url);

    const token = localStorage.getItem("token");
    if (!token) {
      handleError("No authentication token found");
      return;
    }

    const requestBody = JSON.stringify({
      name: values.name,
      completedDays: values.completedDays,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
