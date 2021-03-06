import axios from '../helpers/axios';
import { userConstants } from './constants';

export const getAddress = () => {
    return async dispatch => {
        try {
            const res = await axios.post('/user/getAddress');
            dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
            if (res.status == 200) {
                const {
                    userAddress: {
                        address
                    }
                } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_SUCCESS,
                    payload: { address }
                });
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const addAddress = (payload) => {
    return async dispatch => {
        try {
            const res = await axios.post('/user/address/create', { payload });
            dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
            if (res.status == 200) {
                console.log(res);
                 const {
                    Address: {
                        address 
                    }
                 } = res.data;
                 dispatch({
                    type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                    payload: { address }
                });
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}