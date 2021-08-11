import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewCategory,
    getAllCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions';
import Layout from '../layouts'
import { Container, Row, Col, Button } from 'react-bootstrap';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosArrowForward, IoIosArrowDown, IoIosCheckboxOutline, IoIosCheckbox, IoMdArrowDown, IoIosAdd, IoIosCloudUpload, IoIosTrash
} from "react-icons/io";

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/updateCategoriesModal';
import CreateCategoryModal from './components/createCategoryModal';
import DeleteCategoryModal from './components/deleteCategoryModal';
import './style.css'
/**
* @author
* @function Category
**/

const Category = (props) => {


    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const [show, setShow] = useState(false);
    const [categoryParentId, setcategoryParentId] = useState('');
    const [categoryName, setcategoryName] = useState('');
    const [categoryImage, setcategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [deleteCategoryModal, setdeleteCategoryModal] = useState(false);
    const [updateCategoryModal, setupdateCategoryModal] = useState(false);

    //---------------------------------------------------------------------------create categories form --------------------------------------------------------------------------
    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', categoryParentId);
        form.append('categoryImage', categoryImage);
        dispatch(addNewCategory(form));
        setcategoryName('');
        // setcategoryImage('');
        setcategoryParentId('');

        setShow(false);
    }
    const handleShow = () => setShow(true);
    // const handleupdateCategoryModal = () => setupdateCategoryModal(true)

    //---------------------------------------------------------------------------render categories code--------------------------------------------------------------------------
    const renderCatgories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    value: category._id,
                    label: category.name,
                    children: category.children.length > 0 && renderCatgories(category.children)
                }
            );
        }
        return myCategories;
    }

    //---------------------------------------------------------------------------Create categories--------------------------------------------------------------------------
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

    const handleCategoryImage = (e) => {
        setcategoryImage(e.target.files[0]);
    }

    //---------------------------------------------------------------------------update category function--------------------------------------------------------------------------
    const updateCategory = () => {
        updateCategoriesFunction();
        setupdateCategoryModal(true);

    }

    const updateCategoriesFunction = () => {
        const expandedArray = [];
        const checkedArray = [];
        const categories = createCategoryList(category.categories);
        checked.length > 0 && checked.forEach((categoriId, index) => {
            const category = categories.find((category, _index) => categoriId == category.value)
            category && checkedArray.push(category);
        })

        expanded.length > 0 && expanded.forEach((categoriId, index) => {
            const category = categories.find((category, _index) => categoriId == category.value)
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        }
        else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    //---------------------------------------------------------------------------update categories code--------------------------------------------------------------------------
    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type);
        });
        dispatch(updateCategories(form));
        setupdateCategoryModal(false);
    }

    //---------------------------------------------------------------------------delete categories code--------------------------------------------------------------------------

    const deleteCategory = () => {
        updateCategoriesFunction();
        setdeleteCategoryModal(true);

    }

    const deleteCategories = () => {
        const expandedIdArray = expandedArray.map((item, index) => ({ _id: item.value }))
        const checkedIdArray = checkedArray.map((item, index) => ({ _id: item.value }))
        // const IdSArray = expandedIdArray.concat(checkedIdArray);
        // if (checkedIdArray.length > 0) {
        dispatch(deleteCategoriesAction(checkedIdArray));
        //         .then(result => {
        //             if (result) {
        //                 dispatch(getAllCategory());
        //                 setdeleteCategoryModal(false);
        //             }
        //         });
        // }
        setdeleteCategoryModal(false);
    }

    const categoryList = createCategoryList(category.categories);

    //---------------------------------------------------------------------------Main Page code--------------------------------------------------------------------------

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                            Category
                            <div className='actionButtonContainer'>
                                <span>Actions:</span>
                                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload /><span>Update</span></button>
                                <button onClick={deleteCategory}><IoIosTrash /><span>Delete</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCatgories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: < IoIosCheckbox />,
                                uncheck: < IoIosCheckboxOutline />,
                                halfCheck: < IoIosCheckboxOutline />,
                                expandClose: < IoIosArrowForward />,
                                expandOpen: < IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            < CreateCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                modalTitle={'Create Category'}
                categoryName={categoryName}
                categoryParentId={categoryParentId}
                setcategoryName={setcategoryName}
                setcategoryParentId={setcategoryParentId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
                createCategory={handleClose}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={()=> setupdateCategoryModal(false)}
                modalTitle={'Update'}
                size='lg'
                CategoryList={categoryList}
                handleCategoryInput={handleCategoryInput}
                checkedArray={checkedArray}
                expandedArray={expandedArray}
                updateCategory={updateCategoriesForm}
            />
            <DeleteCategoryModal
                show={deleteCategoryModal}
                handleClose={() => setdeleteCategoryModal(false)}
                modalTitle={'Confirm Deletion'}
                size='lg'
                checkedArray={checkedArray}
                expandedArray={expandedArray}
                setdeleteCategoryModal={setdeleteCategoryModal}
                deleteCategories={deleteCategories}
            />
        </Layout>
    )

}

export default Category;