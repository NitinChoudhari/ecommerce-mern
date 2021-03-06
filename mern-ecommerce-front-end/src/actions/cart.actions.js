import store from "../store";
import { cartConstants } from "./constants";
import axios from '../helpers/axios';

export const addToCart = (product, newQuantity = 1) => {
    return async dispatch => {
        if (store.getState().cart) {
            const { cart: {
                cartItems
            }, auth } = store.getState();
            const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQuantity) : 1;
            cartItems[product._id] = {
                ...product,
                qty
            }
            if (auth.authenticate) {
                dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
                
                const payload = {
                    cartItems: [{
                        product: product._id,
                        quantity: qty
                    }]
                }
                console.log(payload);
                const res = await axios.post('/user/cart/addtocart', payload);
                console.log(res);
                if (res.status == 200) {
                    dispatch(getCartItems());
                }
            }
            else {
                localStorage.setItem('cart', JSON.stringify(cartItems));
            }
            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: { cartItems }
            });

        }
        if (!store.getState().cart) {
            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: { cartItems: product }
            });
        }

    }
}

export const updateCart = () => {
    return async dispatch => {
        const { auth } = store.getState();
        const cartItems = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : null

        if (auth.authenticate) {
            localStorage.removeItem('cart');
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((keys, index) => {
                        return {
                            quantity: cartItems[keys].qty,
                            product: cartItems[keys]._id
                        }
                    })
                };
                if (Object.keys(cartItems).length > 0) {
                    const res = await axios.post('/user/cart/addtocart', payload);
                    if (res.status == 200) {
                        dispatch(getCartItems());
                    }
                }
            }
        }
        else {
            if (cartItems) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: { cartItems }
                });
            }
        }
    }
}

const getCartItems = () => {
    return async dispatch => {
        try {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const res = await axios.post('/user/getCartItems');
            if (res.status == 200) {
                const { cartItems } = res.data;
                console.log({ getCartItems: cartItems })
                if (cartItems) {
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    getCartItems
}