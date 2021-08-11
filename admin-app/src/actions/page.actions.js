import axios from "../helpers/axios"
import { pageConstants } from "./constants";

export const CreatePage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST});
        const res = await axios.post('/page/create', form);
        try {
            if (res.status == 200) {
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                });
            }
            else {
                if (res.status == 400) {
                    dispatch({
                        type: pageConstants.CREATE_PAGE_FAILURE,
                        payload: { error: res.data.error }
                    });
                }
            }
        }catch(error){
            console.log(error);
        }
    }
}