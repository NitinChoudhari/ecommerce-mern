import axios from "../helpers/axios"
import { categoryConstants } from "./constants";

export const getAllCategory = () =>{
   return async dispatch =>{

    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST});
    const res = await axios.get('/category/getcategory');
    // console.log(res);
    if(res.status === 200){
        const { categoryList } = res.data;

        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload:{
                categories: categoryList
            }
        });
    }
    else{
        if(res.status === 400){
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload:{
                     error: res.data.error
                }
            });
        }
    }
   }
}

export const addNewCategory = (form) =>{
    return async dispatch => {
        dispatch({ type: categoryConstants.CATEGORY_ADDITION_REQUEST});
        const res = await axios.post('/category/create', form);
        if(res.status === 200){
            dispatch({
                type: categoryConstants.CATEGORY_ADDITION_SUCCESS,
                payload: { category: res.data.category } 
            });
        }
        else{
            if(res.status === 400){
                dispatch({
                    type: categoryConstants.CATEGORY_ADDITION_FAILURE,
                    payload:  res.data.error
                });
            }
        }
    }
}