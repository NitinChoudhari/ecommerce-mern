import React from 'react';
import Input from '../../UI/Input';
import { Row, Col, } from 'react-bootstrap';
import NewModal from '../../UI/Modal'

const UpdateCategoriesModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        size,
        handleCategoryInput,
        checkedArray,
        expandedArray,
        CategoryList,
        updateCategory
    } = props;

    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
            onSubmit={updateCategory}
        >
    <h5>Expanded</h5>
{
    expandedArray.length > 0 &&
        expandedArray.map((item, index) =>
            <Row>
                <Col>
                    <Input
                        value={item.name}
                        placeholder={'CategoryName'}
                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                    />
                </Col>
                <Col>
                    <select
                        className='form-control'
                        value={item.parentId}
                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                        <option>Select Category</option>
                        {
                            CategoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
                <Col>
                    <select
                        className="form-control"
                        value={item.type}
                        onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                    >
                        <option value=''>Select Type</option>
                        <option value="product">Product</option>
                        <option value="store">Store</option>
                        <option value="page">Page</option>
                    </select>
                </Col>
            </Row>
        )
}
<h5>Checked</h5>
{
    checkedArray.length > 0 &&
        checkedArray.map((item, index) =>
            <Row>
                <Col>
                    <Input
                        value={item.name}
                        placeholder={'CategoryName'}
                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                    />
                </Col>
                <Col>
                    <select
                        className='form-control'
                        value={item.parentId}
                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                        <option>Select Category</option>
                        {
                            CategoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
                <Col>
                    <select
                        className="form-control"
                        value={item.type}
                        onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                    >
                        <option value=''>Select Type</option>
                        <option value="product">Product</option>
                        <option value="store">Store</option>
                        <option value="page">Page</option>
                    </select>
                </Col>
            </Row>
        )
}
        </NewModal >
    );
}

export default UpdateCategoriesModal;