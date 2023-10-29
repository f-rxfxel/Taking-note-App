import React from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
} from "@chakra-ui/react";

const DeleteModal = ({ id, isOpen, onClose, onDelete }) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this note?</ModalBody>
            <ModalFooter>
               <Button variant="ghost" onClick={onClose}>
                  Cancel
               </Button>
               <Button ml={3} colorScheme="red" onClick={onDelete}>
                  Delete
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default DeleteModal;
