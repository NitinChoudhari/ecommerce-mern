import React from 'react';
import NewModal from '../../UI/Modal';

const DeleteCategoryModal = (props) => {

    const {
        show,
        modalTitle,
        handleClose,
        size,
        checkedArray,
        expandedArray,
        setdeleteCategoryModal,
        deleteCategories
    } = props;

    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
            buttons={[
                {
                    label: 'No',
                    color: 'primary',
                    onClick: () => {
                        setdeleteCategoryModal(false);
                    }
                },
                {
                    label: 'Yes',
                    color: 'danger',
                    onClick: () => {
                        deleteCategories();
                    }
                }
            ]}
        >
            <h6>Expanded</h6>
            {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
            <h6>Checked</h6>
            {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
        </NewModal>
    );
}

export default DeleteCategoryModal;