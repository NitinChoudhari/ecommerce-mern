import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
* @author
* @function NewModal
**/

const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.buttons ? props.buttons.map((item, index) =>
                        <Button key={index} variant={item.color} onClick={item.onClick}>
                            {item.label}
                        </Button>
                    ) :
                        <Button variant="primary"
                            {...props}
                            className='btn-sm'
                            onClick={props.onSubmit}>
                            Save
                        </Button>
                }

            </Modal.Footer>
        </Modal>
    )

}

export default NewModal