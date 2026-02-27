const url = "http://localhost:8080"

async function postUser(endpoint = "", data = {}) {
  const response = await fetch(url + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text;
  }
  return response.json();
}

export default postUser;
