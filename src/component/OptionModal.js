import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#app');

const OptionModal= (props)=>(
    <Modal 
        isOpen={!!props.selectedOption} //turn into boolean
        contentLabel="Selected Option"
        onRequestClose={props.handleCloseModal}
        closeTimeoutMS={200}
        className='modal'
    >
        <h3 className='modal__title'>Selected Option</h3>
        {props.selectedOption && <p className='modal__body'>{props.selectedOption}</p>}
        <button className='modal__button' onClick={props.handleCloseModal}>close</button>
    </Modal>
)

export default OptionModal;