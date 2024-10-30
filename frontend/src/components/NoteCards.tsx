import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface NoteCardsProps {
  title: string;
  description: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const NoteCards = ({ title, description, onClickEdit, onClickDelete }: NoteCardsProps) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
      <div className="flex justify-end items-center mt-2 gap-2">
        <button className="text-blue-300 mt-2" onClick={onClickEdit}>
          <FaRegEdit size={20} />
        </button>
        <button className="text-red-500" onClick={onClickDelete}>
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default NoteCards;
