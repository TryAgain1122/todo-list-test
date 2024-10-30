import { FormEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import NoteCards from "../components/NoteCards";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface Notes {
  _id: string;
  title: string;
  description: string;
}

const Home = () => {
  const [isModal, setIsModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Notes[]>([]);
  const [currentNotes, setCurrentNotes] = useState<Notes | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<Notes[]>([]);

  const { id } = useParams();

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          (note.title &&
            note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (note.description &&
            note.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, notes]);

  // Fetch all notes
  useEffect(() => {
    setLoading(true);
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/getAllNotes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setNotes(data.GetData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
    const intervalId = setInterval(fetchNotes, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch notes by ID
  useEffect(() => {
    if (id) {
      const fetchNotesById = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/${id}`
          );
          setTitle(data.success.title);
          setDescription(data.success.description);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNotesById();
    }
  }, [id]);

  const onEditNotes = (note: Notes) => {
    setCurrentNotes(note);
    setTitle(note.title);
    setDescription(note.description);
    setIsModal(true);
  };

  const modelIsClose = () => {
    setIsModal(false);
    setTitle("");
    setDescription("");
    setCurrentNotes(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You have to log in your account first.");
      return;
    }
    try {
      if (currentNotes) {
        // Update existing note
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/updateNotes/${currentNotes._id}`,
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data) {
          setNotes(
            notes.map((note) =>
              note._id === currentNotes._id
                ? { ...note, title, description }
                : note
            )
          );
          toast.success("Notes Updated Successfully");
        }
      } else {
        // Add new note
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/addNotes`,
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data) {
          setNotes([...notes, response.data]);
          toast.success("Not added successfully");
        }
      }

      modelIsClose(); // Close modal and reset fields
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/deleteNote/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes(notes.filter((note) => note._id !== noteId));
      toast.success("Deleted Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={(query) => setSearchQuery(query)} />
      <div className="max-w-7xl w-full mx-auto py-16">
        {loading ? (
          <div className="text-center text-xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.length > 0 ? (
              (searchQuery ? filteredNotes : notes).map((note, index) => (
                <NoteCards
                  key={index}
                  title={note.title}
                  description={note.description}
                  onClickEdit={() => onEditNotes(note)}
                  onClickDelete={() => handleDeleteNote(note._id)}
                />
              ))
            ) : (
              <span className="text-2xl text-center">No Notes</span>
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => setIsModal(true)}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white p-4 font-bold rounded-full"
      >
        +
      </button>
      {isModal && (
        <NoteModal
          onSubmit={handleSubmit}
          currentNote={currentNotes}
          title={title}
          description={description}
          onTitleChange={(e) => setTitle(e.target.value)}
          onDescriptionChange={(e) => setDescription(e.target.value)}
          cancelBtn={modelIsClose}
          loading={loading} // Pass loading state to modal
        />
      )}
    </div>
  );
};

export default Home;
