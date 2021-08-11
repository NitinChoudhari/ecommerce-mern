import axios from "../helpers/axios"
import { pageConstants, productConstants } from "./constants";

export const getProductList = (slug) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_LIST_REQUEST });
        const res = await axios.get(`/products/${slug}`);

        if (res.status == 200) {
            dispatch({
                type: productConstants.GET_PRODUCT_LIST_SUCCESS,
                payload: res.data
            });
        }
        else {
            if (res.status == 400) {
                dispatch({
                    type: productConstants.GET_PRODUCT_LIST_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
        console.log(res);
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {

        try {
            const { cid, type } = payload.params;
            dispatch({ type: pageConstants.GET_PAGE_REQUEST });
            const res = await axios.get(`/page/${cid}/${type}`);
            console.log(res);

            if (res.status == 200) {
                const { page } = res.data;
                dispatch({
                    type: pageConstants.GET_PAGE_SUCCESS,
                    payload: { page }
                });
            }
            else {
                if (res.status == 400) {
                    const { error } = res.data;
                    dispatch({
                        type: pageConstants.GET_PAGE_FAILURE,
                        payload: { error }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            console.log('------------------------',productId);
            res = await axios.get(`/product/${productId}`);
            console.log(res);
                dispatch({
                    type: productConstants.GET_PRODUCT_DETAILS_SUCCESS,
                    payload: { productDetails: res.data.product }
                });  
        } catch (error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}