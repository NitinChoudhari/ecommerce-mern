import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { CreatePage } from '../../actions/page.actions';
import Layout from '../../components/layouts';
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/Modal';
import linearCategoryList from '../../helpers/linearCategoryList';

/**
* @author
* @function NewPage
**/

const NewPage = (props) => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [categoryId, setcategoryId] = useState('');
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [createModal, setCreateModal] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        setCategories(linearCategoryList(category.categories));
    }, [category]);

    const handleCategoryType = (e) => {
        const category = categories.find(category => category.value == e.target.value);
        setcategoryId(e.target.value);
        setType(category.type);
    }
    const createPageForm = () => {
        const form = new FormData();

        if (title == '') {
            alert('enter page title');
            setCreateModal(false);
            return;
        }

        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner)
        });
        products.forEach((product, index) => {
            form.append('products', product)
        });
        dispatch(CreatePage(form));
        setCreateModal(false);
        setTitle('');
        setDesc('');
        setcategoryId('');
        setBanners([]);
        setProducts([]);

    }
    const handleProductImage = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const handleBannerImage = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const renderNewPageModal = () => {

        return (

            <NewModal
                show={createModal}
                handleClose={() => setCreateModal(false)}
                modalTitle={'Create New Page'}
                onSubmit={createPageForm}

            >
                <Container>
                    <div>
                        <Row>
                            <Col>
                                {/* <select
                                    className='form-control form-control-sm'
                                    value={categoryId}
                                    onChange={handleCategoryType}
                                >
                                    <option value=''>Select Category</option>
                                    {
                                        categories.map(cat =>
                                            <option key={cat.value} value={cat.value}>{cat.name}</option>
                                        )
                                    }
                                </select> */}
                                <Input
                                    type="select"
                                    option={categories}
                                    placeholder={'Select Category'}
                                    onChange={handleCategoryType}
                                />
                            </Col>
                            <Col>
                                <Input
                                    className={'form-control-sm'}
                                    value={title}
                                    placeholder={'Page Title'}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                            </Col>
                        </Row>
                        <Row>

                            <Col>
                                <Input
                                    className={'form-control-sm'}
                                    value={desc}
                                    placeholder={'Page Description'}
                                    onChange={(e) => setDesc(e.target.value)}

                                />
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col>
                            <label>Banners:</label>
                            {
                                banners.length > 0 ?
                                    banners.map((banner, index) =>
                                        <Row key={index}>
                                            <Col>{banner.name}</Col>
                                        </Row>
                                    ) : null
                            }
                            <Input
                                type='file'
                                name='Banner'
                                onChange={handleBannerImage}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label>Products:</label>
                            {
                                products.length > 0 ?
                                    products.map((product, index) =>
                                        <Row key={index}>
                                            <Col>{product.name}</Col>
                                        </Row>
                                    ) : null
                            }
                            <Input
                                type='file'
                                name='product'
                                onChange={handleProductImage}
                            />
                        </Col>
                    </Row>

                </Container>
            </NewModal>

        )
    }
    return (
        <Layout sidebar>
            {renderNewPageModal()}
            <button className='btn-sm' onClick={() => setCreateModal(true)}>Create Page</button>
        </Layout>
    );
}


export default NewPage