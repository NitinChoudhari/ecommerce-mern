
const createCategoryList = (categories, option = []) => {
    
    for (let category of categories) {
        option.push(
            {
                name: category.name,
                value: category._id,
                parentId: category.parentId,
                type: category.type
            });
        if (category.children.length > 0) {
            { createCategoryList(category.children, option) }
        }
    }
    return option;
}

export default createCategoryList;