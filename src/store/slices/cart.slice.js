import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";

const initialState = {
    products: [], 
    error: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setProductsCartGlobal: (state, action) => {
            return {...state, products: action.payload}
        },
        setErrorStatus: (state) => {
            return {...state, error: !state.error}
        }
    }
})

const { setProductsCartGlobal, setErrorStatus } = cartSlice.actions

export const getAllCartProducts = () => (dispatch) => {
    axiosEcommerce.get("/cart", getConfig())
        .then(({data}) => dispatch(setProductsCartGlobal(data)))
        .catch((error) => console.log(error))
}

export const addProductCart = (data) => (dispatch) => {
    axiosEcommerce.post("/cart", data, getConfig())
        .then(({data}) => console.log(data))
        .catch((error) => {
            if(error.response.data?.error ==="Product already added to cart"){
                dispatch(setErrorStatus())
                setTimeout(() => {
                    dispatch(setErrorStatus())
                }, 15000)
            }
        })
}

export const deleteProductCart = (id) => (dispatch) => {
    axiosEcommerce.delete(`/cart/${id}`, getConfig())
        .then(({data}) => console.log(data))
        .catch((error) => console.log(error))
}

export const updateProductCar = (id, data) => (dispatch) => {
    axiosEcommerce.put(`/cart/${id}`, data, getConfig())
        .then(({data}) => dispatch(getAllCartProducts(data)))
        .catch((error) => console.log(error))
}

export const purchaseCart = () => (dispatch) => {
    axiosEcommerce.post("/purchases",{}, getConfig())
    .then(({data}) => dispatch(setProductsCartGlobal([  ])))
    .catch((error) => console.log(error))
}
export default cartSlice.reducer