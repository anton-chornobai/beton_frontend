export  const  getProducts = async (endpoint: string = "/products") => {
    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })  

    return res
}

export  const  postProduct = async (endpoint: string = "/products", data: any) => {
    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include"
    })  

    return res;
}