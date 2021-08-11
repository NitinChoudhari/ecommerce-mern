import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getProductList } from '../../../actions';
import Card from '../../../components/UI/Card';
import { generatePublicURL } from '../../../urlConfig';
import "./style.css"

/**
* @author
* @function ProductStore
**/

const ProductStore = (props) => {

  const product = useSelector(state => state.product);
  const [productPrice, setProductPrice] = useState({
    under5K: 5000,
    under10K: 10000,
    under15K: 15000,
    under20K: 20000,
    under25K: 25000,
    under30K: 30000
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const { match } = props;
    dispatch(getProductList(match.params.slug));
  }, []);

  return (
    <>
      {
        Object.keys(product.productsByPrice).map((key, index) => {
          return (
            <Card key={index}
            headerLeft={`${props.match.params.slug} mobile under ${productPrice[key]}`}
            headerRight={ <button>View All</button>}
            >
              <div style={{ display: 'flex' }}>
                {
                  product.productsByPrice[key].map((product, _index) =>
                    <Link 
                    style={{ display:'block'}}
                    to={`/${product.slug}/${product._id}/p`}
                    className="productContainer" key={_index}>
                      <div className="productImageContainer">
                        <img src={generatePublicURL(product.productImage[0].img)} alt='' />
                      </div>
                      <div className="productInfo">
                        <div style={{ margin: '5px 0' }}>{product.name}</div>
                        <div>
                          <span>4.3</span>&nbsp;
                          <span>4686</span>
                        </div>
                        <div className="productPrice">{product.price}</div>
                      </div>
                    </Link>

                  )
                }
              </div>
            </Card>
          );
        }
        )
      }
    </>
  )

}

export default ProductStore