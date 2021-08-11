import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductPage } from '../../../actions';
import getParams from '../../../Utility';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';

/**
* @author
* @function ProductPage
**/

const ProductPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getParams(props.location.search);
        const payload = {
            params
        }
        dispatch(getProductPage(payload));
    }, []);

    return (
        <div style={{ margin: '0 5px' }}>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => { }}
            >

                {
                    page.banners && page.banners.map((banner, index) =>
                        <a key={index}
                            href={banner.navigateTo}
                            style={{}} >
                            <img
                            style={{ width: '100%' , height:'560px'}} 
                            src={banner.img} alt="" />
                        </a>
                    )
                }

            </Carousel>
            <div style={{
                display:'flex',
                justifyContent:'center',
                flexWrap:'wrap',
                margin:'0 10px'
            }}>
                {
                    page.products && page.products.map((product, index) =>
                        <Card key={index}
                            href={product.navigateTo}
                            style={{
                                display:'flex',
                                height: '200px',
                                width: '400px',
                                margin: '5px'
                            }}
                        >
                            <img style={{
                                width:'100%', 
                                height:'100%',
                                objectFit:'cover'
                                }} src={product.img} alt='' />
                        </Card>
                    )
                }
            </div>
        </div>
    )

}

export default ProductPage