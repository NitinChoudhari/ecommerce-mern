import { pageConstants, productConstants } from "../actions/constants";

const initState = {
    products: [],
    productsByPrice:{
        under5K:[],
        under10K:[],
        under15K:[],
        under20K:[],
        under25K:[],
        under30K:[]
    },
    page: {},
    pageRequest: false,
    error:null,
    productDetails: {},
    loading: false
}
export default (state = initState, action) =>{
    switch(action.type){
        case productConstants.GET_PRODUCT_LIST_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
        case pageConstants.GET_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest: true
            }
            break;
        case pageConstants.GET_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageRequest: false
            }
            break;
        case pageConstants.GET_PAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                pageRequest: false
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_SUCCESS:
            state = {
                ...state,
                productDetails: action.payload.productDetails,
                loading: false
            }
            break;
        case productConstants.GET_PRODUCT_LIST_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
    }
    return state
}