import { React, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const Note = ({ id, note, notes, setNotes }) => {
   
   const iconSize = useBreakpointValue({
      base: "20px",
      sm: "20px",
      md: "22px",
      lg: "20px",
   });

   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
   const [isEditModalOpen, setEditModalOpen] = useState(false);

   const handleDeleteClick = () => {
      setDeleteModalOpen(true);
   };
   const handleEditClick = () => {
      setEditModalOpen(true);
   };

   const handleConfirmDelete = () => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
         method: "DELETE",
      })
         .then((response) => {
            // note é excluído, mas o dom não renderiza
            console.log("excluído - " + response.status);
            const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
            setDeleteModalOpen(false);
         })
         .catch((err) => {
            console.log(err);
         });
      setDeleteModalOpen(false);
   };

   // const handleConfirmEdit = (editTitle, editDescription) => {
   //    console.log(editTitle, editDescription)
   //    fetch(`https://jsonplaceholder.typicode.com/posts/${note.id}`, {
   //       method: "PUT",
   //       body: JSON.stringify({
   //          title: editTitle,
   //          description: editDescription,
   //       }),
   //       headers: {
   //          "Content-type": "application/json; charset=UTF-8",
   //       },
   //    })
   //       .then((response) => {
   //          console.log(response.status);
   //          const updatedNotes = notes.filter((note) => note.id !== id);
   //          setNotes(updatedNotes);
   //          setDeleteModalOpen(false);
   //       })
   //       .catch((err) => {
   //          console.log(err);
   //       });
   //    setDeleteModalOpen(false);
   // };

   return (
      <li>
         <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
               <div className="w-24 h-full bg-yellow-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col pt-2 pb-6 mb-4 xl:ml-16">
               <div className="flex justify-end xl:justify-normal gap-6 mx-6 my-3 xl:flex-col">
                  <EditIcon
                     boxSize={iconSize}
                     role="button"
                     onClick={handleEditClick}
                  />
                  <DeleteIcon
                     boxSize={iconSize}
                     role="button"
                     onClick={handleDeleteClick}
                  />
               </div>
               <div className="mx-6 xl:ml-3 max-w-screen-md">
                  <h1 className="text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                     {note.title}
                  </h1>
                  <p className="leading-relaxed text-base mt-2">{note.body}</p>
               </div>
            </div>
         </div>
         <DeleteModal
            id={note.id}
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={() => handleConfirmDelete()}
         />
         <EditModal
            id={note.id}
            note={note}
            notes={notes}
            setNotes={setNotes}
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onEdit={() => handleConfirmEdit}
            setEditModalOpen={setEditModalOpen}
         />
      </li>
   );
};
export default Note;
