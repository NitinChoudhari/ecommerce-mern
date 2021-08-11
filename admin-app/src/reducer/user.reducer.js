import { userConstant} from '../actions/constants';

export const initstate = {
    error: null,
    message:'',
    loading: false
}

export default(state = initstate, action) =>{

    // console.log(action)

    switch(action.type){
        case userConstant.SIGNUP_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case userConstant.SIGNUP_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                loading: false
            }
            break;
        case userConstant.SIGNUP_FAILED:
            state = {
                ...state,
                loading: false
            }
            break;
    }
    return state;
}