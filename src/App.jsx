import Note from "./components/Note";
import { useState, useEffect } from "react";
import {
   Button,
   useDisclosure,
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
   useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function App() {
   const [notes, setNotes] = useState([]);
   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
         .then((res) => res.json())
         .then((data) => setNotes(data))
         .catch((err) => console.log(err));
   }, []);

   const { isOpen, onOpen, onClose } = useDisclosure();
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      const note = { title, description };

      await fetch("https://jsonplaceholder.typicode.com/posts", {
         method: "POST",
         body: JSON.stringify(note),
         headers: { "Content-type": "application/json; charset=UTF-8" },
      })
         .then((res) => res.json())
         .then((data) => {
            setNotes([...notes, data]);
         })
         .catch((err) => {
            console.log(err);
         });

      setTitle("");
      setDescription("");
      onClose();
   };

   const buttonSize = useBreakpointValue({
      base: "md",
      sm: "sm",
      md: "md",
      lg: "lg",
   });

   return (
      <div className="w-screen h-screen md:flex flex-col overflow-x-hidden">
         <h1 className="text-gray-900 font-bold title-font text-3xl mt-4 text-center underline decoration-yellow-500">
            Taking-note App
         </h1>
         <div>
            <Button onClick={onOpen} size={buttonSize} className="m-6">
               New note
            </Button>
         </div>
         <ul>
            {notes.map((note, index) => (
               <Note key={index} note={note} />
            ))}
         </ul>
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
                        />
                        <Textarea
                           onChange={(e) => setDescription(e.target.value)}
                           value={description}
                           mt={4}
                           placeholder="Description"
                           name="description"
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
      </div>
   );
}

export default App;