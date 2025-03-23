export default async function registerUserAPI(userData) {
  const BaseUrl = import.meta.env.VITE_BACKEND2_BASE_URL;
  const endPoint = "/register";
  const url = `${BaseUrl}${endPoint}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Registration failed");

  return data;
}
