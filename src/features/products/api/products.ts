export  const  getProducts = async (endpoint: string = "/v1//products") => {
    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })  

    return res
}

export  const  getProductByID = async (endpoint: string = "/products", id: string | undefined) => {
    const res = await fetch(import.meta.env.VITE_API_URL + endpoint +  "/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })  

    return res
}