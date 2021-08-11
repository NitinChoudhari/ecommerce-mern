import Layout from '../layouts'
import Input from '../UI/Input';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap'
import { addNewProduct } from '../../actions/product.actions';
import NewModal from '../UI/Modal';
import { productImageURL } from '../../urlConfig'
import './style.css'

/**
* @author
* @function Products
**/

const Products = (props) => {

  const dispatch = useDispatch();
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const [show, setShow] = useState(false);
  const [name, setname] = useState('');
  const [productImage, setproductImage] = useState([]);
  const [description, setdescription] = useState('');
  const [quantity, setquantity] = useState('');
  const [categoryId, setcategoryId] = useState('');
  const [price, setprice] = useState('');
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const handleClose = () => {

    const form = new FormData();

    form.append('name', name);
    form.append('quantity', quantity);
    form.append('category', categoryId);
    form.append('price', price);
    form.append('description', description);

    for (let pic of productImage) {
      form.append('productImage', pic);
    }

    dispatch(addNewProduct(form));
    setShow(false);
  }
  const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);


  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push(
        { name: category.name, value: category._id });
      if (category.children.length > 0) {
        { createCategoryList(category.children, option) }
      }
    }
    // console.log(option);
    return option;
  }


  const handleproductImage = (e) => {
    setproductImage([
      ...productImage,
      e.target.files[0]
    ]);
  }

  // console.log(productImage);
  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  }

  const ShowProductDetailModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
    console.log(product)
  }

  const ShowProducts = () => {
    return (
      <Table responsive="sm" className="cursr">
        <thead>
          <tr className='key'>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody className='value'>
          {
            product.products.length > 0 ?
              product.products.map(product =>
                <tr onClick={() => ShowProductDetailModal(product)} key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ) : null
          }
        </tbody>
      </Table>
    );
  }

  const renderAddProduct = () => {
    return (
      <NewModal
        show={show}
        handleClose={()=>{setShow(false)}}
        modalTitle={'Product'}
        onSubmit={handleClose}
      >
        <Input
          value={name}
          placeholder={'Product Name'}
          onChange={e => setname(e.target.value)}
        />
        <Input
          value={quantity}
          placeholder={'quantity'}
          onChange={e => setquantity(e.target.value)}
        />
        <Input
          value={price}
          placeholder={'Price'}
          onChange={e => setprice(e.target.value)}
        />
        <Input
          value={description}
          placeholder={'desctiption'}
          onChange={e => setdescription(e.target.value)}
        />
        <select
          className='form-control'
          value={categoryId}
          onChange={(e) => setcategoryId(e.target.value)}>
          <option>Select Category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>)
          }
        </select>

        {
          productImage.length > 0 ?
            productImage.map((pic, index) => <div key={index}>{pic.name}</div>) : null
        }

        <input type='file' name='productImage' onChange={handleproductImage} />
      </NewModal>
    );
  }

  const renderProductDetailModal = () => {

    if (!productDetails) {
      return null;
    }

    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailModal}
        modalTitle={'Products'}
        size='lg'
      >
        <Row>
          <Col md='6'>
            <label className='key'>Name</label>
            <p className='value'>{productDetails.name}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Price</label>
            <p className='value'>{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <label className='key'>Quantity</label>
            <p className='value'>{productDetails.quantity}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Category</label>
            <p className='value'>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className='key'>Product Images</label>
            <div style={{ display: 'flex' }}>
              {productDetails.productImage.map(picture =>
                <div className='productImageContainer'>
                  <img src={productImageURL(picture.img)} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </NewModal>
    );

  }


  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
              Product
              <Button variant="primary" onClick={handleShow}>
                Add Product
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {ShowProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProduct()}
      {renderProductDetailModal()}
    </Layout>
  )

}

export default Products