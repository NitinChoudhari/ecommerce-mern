export default (query) =>{
    if(query){
        const queryString = query.split('?')[1];
        if(queryString.length > 0){
            const params = queryString.split('&');
            const queryObj = {};
            params.forEach(param => {
                const keyVaue = param.split('=');
                queryObj[keyVaue[0]]=keyVaue[1];
            });
            return queryObj;
        }
    }
    return {};
}