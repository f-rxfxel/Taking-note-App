import React from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   FormControl,
   Input,
   Textarea,
   Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddModal = ({
   isOpen,
   onOpen,
   onClose,
   handleSubmit,
   title,
   setTitle,
   description,
   setDescription,
}) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <form onSubmit={handleSubmit}>
               <ModalHeader>Create note</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <FormControl>
                     <Input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder="Title"
                        type="text"
                        name="title"
                        id="title"
                     />
                     <Textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        mt={4}
                        placeholder="Description"
                        name="description"
                        id="description"
                     />
                  </FormControl>
               </ModalBody>

               <ModalFooter>
                  <Button variant="ghost" onClick={onClose}>
                     Cancel
                  </Button>
                  <Button
                     leftIcon={<AddIcon />}
                     colorScheme="yellow"
                     ml={3}
                     type="submit"
                  >
                     Add
                  </Button>
               </ModalFooter>
            </form>
         </ModalContent>
      </Modal>
   );
};

export default AddModal;
