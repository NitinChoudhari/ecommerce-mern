import axios from "../helpers/axios"

export const addNewProduct = (form) =>{
    return async dispatch =>{
        const res = axios.post('/product/create', form);
        console.log(res);
    }
}