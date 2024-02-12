import Header from "./Components/Header/Header";
import ToDoItem from "./Components/ToDoItems/ToDoItems";
import "./index";
import './App.css';
import CircleButton from "./Components/CircleButton/CircleButton";
import CreateNoteModal from "./Components/CreateNoteModal/CreateNoteModal";
import EditNoteModal from "./Components/EditNoteModal/EditNoteModal";
import { useEffect, useState } from "react";
import { loadNotes, updateNote, deleteNote, createNote} from './api';

const emptyNoteState = {
    id: null,
    title: ''
};
  
export default function App(){
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(emptyNoteState);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [editedNote, setEditedNote] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');

    const handleNoteEdit = (note) => {
        setEditedNote(note);
        setEditModalIsOpen(true);
    };

    const handleNoteSave = async (updatedNote) => {
        const note = await updateNote({
            ...editedNote,  
            ...updatedNote, // Update the title
          });

        const updatedNotes = notes.map((n) => {
            if (n.id === note.id) {
                return note;
            }

            return n;
        });

        setNotes(updatedNotes);
        setEditModalIsOpen(false);
        setActiveNote(updatedNote);
    };
      
    const handleNoteDelete = async (noteId) => { //Delete note

        try{
        await deleteNote(noteId);
        const updatedNotes = notes.filter((n) => n.id !== noteId);

        setNotes(updatedNotes);
        setActiveNote({...emptyNoteState});
        }catch (error){
            console.error('Failed to delete note',error);
        }
    };

    const handleOpenModal = () => {
        setModalIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setModalIsOpen(false);
      };
    
      const handleCreateNote = async (newNote) => {
        const note = await createNote(newNote);
    
        setNotes([...notes, note]);
        handleCloseModal();
      };

      const handleSearchChange = (value) => {
        setSearchQuery(value);
      };
    
      const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
        
      };

    useEffect(() => { //Get data
        const fetchNotes = async () => {
            const loadedNotes = await loadNotes();
            setNotes(loadedNotes);
        };

        fetchNotes();
    }, []);

    return(
        <>
        <Header searchQuery={searchQuery} onSearch={handleSearchChange} onFilterChange={handleFilterChange} />
        <ToDoItem 
        notes={notes}
        onNoteClick={(note) => setActiveNote(note)}
        activeNoteId={activeNote.id}
        note={activeNote}
        onNoteEdit={handleNoteEdit}
        onNoteDelete={handleNoteDelete}
        />
        <CircleButton openModal={handleOpenModal}/>
        <CreateNoteModal
        showModal={modalIsOpen}
        handleClose={handleCloseModal}
        addNote={handleCreateNote}
      />
      <EditNoteModal
                showModal={editModalIsOpen}
                handleClose={() => setEditModalIsOpen(false)}
                onSave={handleNoteSave}
                initialTitle={editedNote.title}
        />
        </>
    );
}