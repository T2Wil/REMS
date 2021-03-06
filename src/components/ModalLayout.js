import React from 'react';
import { Modal } from 'react-bootstrap';
import "../assets/styles/card.scss";

const ModalLayout = ({ children, handleShow, show, header, handleClick, buttonName }) => {
  
    const handleClose = () => handleShow();
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
            <h6 className="modal-title m-title" >{header}</h6>
            </Modal.Title>
          </Modal.Header>
          <div className="modal-body-scroll">
          {children}
          </div>
          <Modal.Footer>
            <button className="blue-btn" onClick={handleClick}>
              {buttonName ? buttonName : 'Submit'}
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ModalLayout;
