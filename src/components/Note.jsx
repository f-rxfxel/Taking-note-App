import { React, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";
import DeleteModal from "./DeleteModal";

const Note = ({ note }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const iconSize = useBreakpointValue({
    base: "20px",
    sm: "20px",
    md: "22px",
    lg: "20px",
  });

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Coloque sua lógica de exclusão aqui
    // Por exemplo, você pode chamar uma função onDelete(note.id)
    // para excluir a nota com o ID específico.
    // Após a exclusão, você pode fechar o modal de exclusão.
    setDeleteModalOpen(false);
  };


   if (note.id > 100) {
      return (
         <li>
            <div className="flex flex-col">
               <div className="h-1 bg-gray-200 rounded overflow-hidden">
                  <div className="w-24 h-full bg-yellow-500"></div>
               </div>
               <div className="flex flex-wrap sm:flex-row flex-col pt-2 pb-6 mb-4 xl:ml-16">
               <div className="flex justify-end xl:justify-normal gap-6 mx-6 my-3 xl:flex-col">
        <EditIcon boxSize={iconSize} role="button" />
        <DeleteIcon boxSize={iconSize} role="button" onClick={handleDeleteClick} />
      </div>
                  <div className="mx-6 xl:mx-3">
                     <h1 className="text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                        {note.title}
                     </h1>
                     <p className="leading-relaxed text-base mt-2">
                        {note.description}
                     </p>
                  </div>
               </div>
            </div>
            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={handleConfirmDelete} />
            
         </li>
      );
   };
}
export default Note;
