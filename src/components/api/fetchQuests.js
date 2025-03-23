async function fetchQuestAPI(handleResponse, handleError) {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND2_BASE_URL;
    const endpoint = "/quests";

    const url = `${baseUrl}${endpoint}`;

    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorMessage = "unknown error occured";
      throw new Error(errorMessage);
    }

    let jsonData;
    try {
      jsonData = await response.json();
    } catch (error) {
      throw new Error("invalid json response from server", error);
    }

    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  }
}

export default fetchQuestAPI;
