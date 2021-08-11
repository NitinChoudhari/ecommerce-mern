import axios from "../helpers/axios"
import { categoryConstants } from "./constants";

const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get('/category/getcategory');
        // console.log(res);
        if (res.status === 200) {
            const { categoryList } = res.data;

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories: categoryList
                }
            });
        }
        else {
            if (res.status === 400) {
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const addNewCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.CATEGORY_ADDITION_REQUEST });
        const res = await axios.post('/category/create', form);
        try {
            if (res.status === 200) {
                dispatch({
                    type: categoryConstants.CATEGORY_ADDITION_SUCCESS,
                    payload: { category: res.data.category }
                });
            }
            else {
                if (res.status === 400) {
                    dispatch({
                        type: categoryConstants.CATEGORY_ADDITION_FAILURE,
                        payload: res.data.error
                    });
                }
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {

        dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
        const res = await axios.post('/category/update', form);
        if (res.status === 200) {
            dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS,});
            dispatch(getAllCategory());
        }
        else {
            if (res.status === 400) {
                const { error } = res;
                dispatch({ 
                    type: categoryConstants.UPDATE_CATEGORIES_FAILURE ,
                    payload: { error}
                });
            }
        }
    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {

        dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST});
        const res = await axios.post('/category/delete', {
            payload: {
                ids
            }
        });
        if (res.status === 200) {
            dispatch(getAllCategory());
            dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS});
        }
        else {
            if (res.status === 400) {
                const { error } = res.data;
                dispatch({
                    type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                    patload: { error }
                });
                return false;
            }
        }
    }
}

export {
    getAllCategory
}