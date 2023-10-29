import { React, useState } from "react";
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

const EditModal = ({
   id,
   note,
   notes,
   setNotes,
   isOpen,
   onClose,
   onEdit,
   setEditModalOpen,
}) => {
   const [editTitle, setEditTitle] = useState(note.title);
   const [editBody, setEditBody] = useState(note.body);
   const [isLoading, setIsLoading] = useState(false);

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
                        onChange={(e) => setEditBody(e.target.value)}
                        value={editBody}
                        mt={4}
                        placeholder="Description"
                        name="body"
                        id="body"
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
                     isLoading={isLoading}
                     loadingText="Confirming..."
                     // onClick={onEdit(editTitle, editDescription)}
                     onClick={() => {
                        setIsLoading(true);
                        fetch(
                           `https://jsonplaceholder.typicode.com/posts/${id}`,
                           {
                              method: "PUT",
                              body: JSON.stringify({
                                 title: editTitle,
                                 body: editBody,
                              }),
                              headers: {
                                 "Content-type":
                                    "application/json; charset=UTF-8",
                              },
                           }
                        )
                           .then((response) => {
                              console.log("alterado - " + response.status);
                              const updatedNote = {
                                 id: id,
                                 title: editTitle,
                                 body: editBody,
                              };
                              const originalIndex = notes.findIndex(
                                 (note) => note.id === id
                              );
                              const updatedNotes = [...notes];
                              updatedNotes[originalIndex] = updatedNote;
                              setNotes(updatedNotes);
                              setEditModalOpen(false);
                              setIsLoading(false);
                           })
                           .catch((err) => {
                              console.log(err);
                              setIsLoading(false);
                           });
                     }}
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
