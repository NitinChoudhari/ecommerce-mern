import axios from "../helpers/axios";
import { cartConstants, userConstants } from "./constants";

export const createOrder = (payload) => {
    return async dispatch => {
        try {
            const res = await axios.post('/addOrder',  payload );
            console.log(payload);
            dispatch({ type: userConstants.CONFIRM_ORDER_REQUEST });
            if (res.status == 200) {
                console.log(res);
                dispatch({ type: cartConstants.RESET_CART});
                //  const {
                //     order 
                //  } = res.data;
                //  dispatch({
                //     type: userConstants.CONFIRM_ORDER_SUCCESS,
                //     payload: { order }
                // });
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.CONFIRM_ORDER_FAILURE,
                    payload: { error }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const getOrder = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/getOrder');
            dispatch({ type: userConstants.GET_USER_ORDER_REQUEST});
            if (res.status == 200) {
                console.log(res);
                 const {
                    orders 
                 } = res.data;
                 dispatch({
                    type: userConstants.GET_USER_ORDER_SUCCESS,
                    payload: { orders }
                });
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_FAILURE,
                    payload: { error }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}