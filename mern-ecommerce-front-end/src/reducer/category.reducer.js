import { categoryConstants } from "../actions/constants"


export const initState = {
    loading: false,
    categories: [],
    error: null
}

const buildNewCategory = (parentId, categories, category) => {
    let myCategory = [];

    if(parentId === undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }

    for (let cate of categories) {
        if (cate._id === parentId) {
            myCategory.push({
                ...cate,
                children: cate.children && cate.children.length > 0 ? buildNewCategory( parentId, [...cate.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category):[]
            });
        }
        else{
            myCategory.push({
                ...cate,
                children: cate.children && cate.children.length > 0 ? buildNewCategory(parentId, cate.children, category): [] 

            });
        }
    }
    return myCategory;

}

export default (state = initState, action) => {

    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false
            }
            break;
        case categoryConstants.CATEGORY_ADDITION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.CATEGORY_ADDITION_SUCCESS:
            const category = action.payload.category;
            const updatedCategories =  buildNewCategory(category.parentId, state.categories, category);
            // console.log('updated categories', updatedCategories);
            state = {
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;
        case categoryConstants.CATEGORY_ADDITION_FAILURE:
            state = {
                ...initState
            }
            break;
    }

    return state;
}