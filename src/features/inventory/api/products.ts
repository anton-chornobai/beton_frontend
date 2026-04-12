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

export const postProduct = async (endpoint: string = "/products", data: any) => {
    const fd = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        fd.append(key, value);          
      } else if (value != null) {
        fd.append(key, String(value)); 
      }
    });
  
    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      method: "POST",
      body: fd,
      credentials: "include",
    });
  
    return res;
  };

export const deleteProduct = async (endpoint: string) => {
    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    
    return res
}

export const patchProduct = async (endpoint: string, data: any) => {
    const fd = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        fd.append(key, value);
      } else if (value != null) {
        fd.append(key, String(value));
      }
    });
  
    return fetch(import.meta.env.VITE_API_URL + endpoint, {
      method: "PATCH",
      body: fd,
      credentials: "include",
    });
  };