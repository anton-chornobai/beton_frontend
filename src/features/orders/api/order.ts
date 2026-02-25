export async function getOrders(url: string = "", data = "") {
    const orders = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "plain/text",
        },
        credentials: "include",
    })

    return orders.json()
}