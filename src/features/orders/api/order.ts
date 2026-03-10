import { Order } from "../types/Order";

export const getOrders = async (endpoint: string = "") => {
    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }) 

    return res;
}

const postOrder = async (endpoint: string = "", data: Order) => {
    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }) 

    return res;
}

