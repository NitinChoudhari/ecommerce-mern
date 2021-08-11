import React from 'react'
import Layout from '../../components/Layout/index.'
import ProductStore from './ProductStore';
import getParams from '../../Utility'
import ProductPage from './ProductPage';
import ClothingAndAccessories from './ClothingAndAccessories';

/**
* @author
* @function ProductListPage
**/

const ProductListPage = (props) => {

    const renderProduct = () =>{
        console.log(props)
        const params = getParams(props.location.search);
        console.log(params);

        let content = null;
        switch(params.type){
            case 'page':
                content =  <ProductPage {...props} />
                break;
            case 'store':
                content = <ProductStore {...props} />
                break;
            default: 
                content = <ClothingAndAccessories {...props}/>
        }
        return content;
    }
   
    return (
        <div>
            <Layout>
                {renderProduct()}
            </Layout>
        </div>
    )

}

export default ProductListPage