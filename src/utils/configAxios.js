import axios from "axios"

export const axiosEcommerce = axios.create({
    baseURL: "https://e-commerce-api-v2.academlo.tech/api/v1"
    
})

export const getConfig = () => {
  if(JSON.parse(localStorage.getItem("userInfo"))){
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    return config
  }
  }