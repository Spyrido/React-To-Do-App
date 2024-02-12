import './ToDoItems.scss';
import { useEffect, useState } from 'react';
import EditNoteModal from '../EditNoteModal/EditNoteModal';
import { updateNote } from '../../api';

export default function ToDoItems({note, notes,onNoteEdit,onNoteDelete}){

  const [updatedNotes,setUpdatedNotes] = useState(notes);
  const [isHovered, setIsHovered] = useState(false);
  const [editedNote, setEditedNote] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const handleNoteChange = (note) => {
    setEditedNote(note);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedNote = (updatedNote) => {
    onNoteEdit(updatedNote);
    setIsEditModalOpen(false);
    setEditedNote(null);
  };

  const handleCheckboxChange = async (noteId) => {
    const updatedNoteList = notes.map((n)=> 
    n.id === noteId ? {...n, completed: !n.completed} : n
    );
    // Toggle the completion status when the checkbox is clicked
    setUpdatedNotes(updatedNoteList);
    try {
      const updatedNote = updatedNoteList.find((n) => n.id === noteId);
      await updateNote(updatedNote);
    } catch (error) {
      console.error('Failed to update note', error);
    }
  };

  useEffect(() => {
    setUpdatedNotes(note);
  }, [note]);

  const filterNotes = () => { //Filtering
    if (filter === 'All') {
      return notes;
    } else if (filter === 'Complete') {
      return notes.filter((note) => note.completed);
    } else if (filter === 'Incomplete') {
      return notes.filter((note) => !note.completed);
    }

    return notes;
  };

  const filteredNotes = filterNotes();
  
  return(
    <div className="note-item" >
       <ul>
            {filteredNotes.map((note) => (
            <li key={note.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
            <input className="checkbox-item" 
            type="checkbox" 
            id= {`note-checkbox-${note.id}`} 
            name={`note-check-${note.id}`} 
            defaultValue="note" 
            checked={note.completed || false} // Set the checked state based on note's completion status
            onChange={() => handleCheckboxChange(note.id)} />
            <label htmlFor={`note-checkbox-${note.id}`} onClick={handleNoteChange}> {note.title} </label>
            
            {isHovered && (
            <div className="icon-container">
              <button type="button" onClick={() => onNoteEdit(note)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736" stroke="#CDCDCD" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button type="button" onClick={() => onNoteDelete(note.id)}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD"/>
                  <path d="M14.625 3.75H3.375" stroke="#CDCDCD" strokeLinecap="round"/>
                  <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD"/>
                  <path d="M10.5 9V12.75" stroke="#CDCDCD" strokeLinecap="round"/>
                  <path d="M7.5 9V12.75" stroke="#CDCDCD" strokeLinecap="round"/>
               </svg>
              </button>
            </div>
            )}

            {isEditModalOpen && (
              <EditNoteModal
                isOpen={isEditModalOpen}
                handleClose={() => setIsEditModalOpen(false)}
                initialNote={editedNote}
                onSave={handleSaveEditedNote}
              />
            )}

          </li>
          
      ))}
      </ul>
    </div>
  ); 
}
