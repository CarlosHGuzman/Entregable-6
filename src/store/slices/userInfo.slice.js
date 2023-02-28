import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";
import  setProductsCartGlobal  from "./cart.slice";

const initialState = {
    user: {
        id: 0, 
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        createdAt: "",
        updateAt: ""
    },
    token: "",
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: localStorage.getItem("userInfo") ? 
    JSON.parse(localStorage.getItem("userInfo"))
    : initialState,
    reducers: {
        setUserInfoGlobal: (state, action) => {
            return action.payload
        }
    }
})
const {setUserInfoGlobal} = userInfoSlice.actions

export const loginUser = (data) => (dispatch) => {
    console.log(data)
    axiosEcommerce.post("/users/login", data)
        .then(({data}) => {
            localStorage.setItem("userInfo", JSON.stringify(data))
            dispatch(setUserInfoGlobal(data))
        })
        .catch((error) => console.log(error))
}

export const userLogOut = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch(setUserInfoGlobal(initialState))
    dispatch(setProductsCartGlobal([]))
}

export default userInfoSlice.reducer