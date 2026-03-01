async function getVerifyCode<T = any>(
    endpoint: string,
    data: unknown
  ): Promise<T> {
    const response = await fetch(
      import.meta.env.VITE_API_URL + endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );
  
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Request failed");
    }
  
    return response.json();
  }
  
  export default getVerifyCode;