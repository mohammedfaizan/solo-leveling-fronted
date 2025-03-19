async function fetchQuestAPI(handleResponse, handleError) {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const endpoint = "/quests";

    const url = `${baseUrl}${endpoint}`;

    console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = "unknown error occured";
      throw new Error(errorMessage);
    }

    const jsonData = await response.json();

    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  }
}

export default fetchQuestAPI;
