import React from 'react';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function Modals(props){
  const {isOpen,deletedData,onDelete,onCansel} = props
    return (
      <div className="animated fadeIn">
                <Modal isOpen={isOpen} 
                       className={'modal-info '}>
                  <ModalHeader >{`Delete ${deletedData}`} </ModalHeader>
                  <ModalBody>
                        {`You want delete ${deletedData}?`}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick = {onDelete}>Delete</Button>
                    <Button color="secondary" onClick = {onCansel}>Cancel</Button>
                  </ModalFooter>
                </Modal>

             
         
      </div>
    );
    }


export default Modals;
