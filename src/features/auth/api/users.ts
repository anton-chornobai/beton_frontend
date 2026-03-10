async function postUser(endpoint = "", data = {}) {
  const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });



  

  return response;
}

export default postUser;
