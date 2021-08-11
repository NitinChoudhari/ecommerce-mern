import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Input from '../../UI/Input';
import NewModal from '../../UI/Modal'

const CreateCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        categoryParentId,
        setcategoryName,
        setcategoryParentId,
        categoryList,
        handleCategoryImage,
        createCategory
    } = props;

    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            onSubmit={createCategory}
        >
            <div>
                <Row>
                    <Col>
                        <Input
                            className={'form-control-sm'}
                            value={categoryName}
                            placeholder={'CategoryName'}
                            onChange={(e) => setcategoryName(e.target.value)}
                            className={'form-control-sm'}
                        />

                    </Col>
                    <Col>
                        <select
                            className='form-control form-control-sm'
                            vlaue={categoryParentId}
                            onChange={(e) => setcategoryParentId(e.target.value)}>
                            <option>Select Category</option>
                            {
                                categoryList.map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>
                    </Col>
                </Row>
                <Row style={{ margin: '0 5px'}}>
                    <input type='file' name='categoryImage' onChange={handleCategoryImage} />
                </Row>

            </div>
        </NewModal>
    );
}

export default CreateCategoryModal;