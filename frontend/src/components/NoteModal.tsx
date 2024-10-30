import { ChangeEvent, FormEvent } from "react";

interface Notes {
  title: string;
  description: string;
}

interface NoteModalProps {
  title: string;
  description: string;
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  cancelBtn: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  currentNote: Notes | null;
  loading: boolean; // Add loading prop
}

const NoteModal = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  cancelBtn,
  onSubmit,
  currentNote,
  loading, // Receive loading prop
}: NoteModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">{currentNote ? "Edit Note" : "Add New Note"}</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={title}
            onChange={onTitleChange}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
            required // Make title field required
          />
          <textarea
            value={description}
            onChange={onDescriptionChange}
            placeholder="Note Description"
            className="border p-2 w-full mb-4"
            required // Make description field required
          />
          <button
            type="submit"
            className={`mb-4 bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} // Disable button while loading
          >
            {currentNote ? "Update Note" : "Add Note"}
          </button>
        </form>
        <button className="mt-4 text-red-500" onClick={cancelBtn}>Cancel</button>
      </div>
    </div>
  );
};

export default NoteModal;
