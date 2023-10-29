import {React, useState} from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   FormControl,
   Input,
   Textarea,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const EditModal = ({ id, note, isOpen, onClose, onEdit }) => {

    const [editTitle, setEditTitle] = useState(note.title)
    const [editDescription, setEditDescription] = useState(note.description)
    {console.log(id)}

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <form>
               <ModalHeader>Edit note</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <FormControl>
                     <Input
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        placeholder="Title"
                        type="text"
                        name="title"
                        id="title"
                     />
                     <Textarea
                        onChange={(e) => setEditDescription(e.target.value)}
                        value={editDescription}
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
                     leftIcon={<CheckIcon />}
                     colorScheme="yellow"
                     ml={3}
                     onClick={(id, editTitle, editDescription) => onEdit(id, editTitle, editDescription)}
                  >
                     Confirm
                  </Button>
               </ModalFooter>
            </form>
         </ModalContent>
      </Modal>
   );
};

export default EditModal;
