
const baseUrl = 'http://localhost:3000/notes';

export const loadNotes = async () => {
  
  const resp = await fetch(baseUrl);

  if (!resp.ok) {
    throw new Error('Failed to load tasks');
  }

  return resp.json();
};

export const updateNote = async (updatedNote) => {

  const resp = await fetch(baseUrl + '/' + updatedNote.id, {
    method: 'PUT',
    body: JSON.stringify(updatedNote),
    headers: {
      'Content-Type': 'application/json'
    }
  });


  if (!resp.ok) {
    console.error('Failed to update note:', resp.statusText);
    throw new Error('Failed to update note');
  }

  return resp.json();
};

export const deleteNote = async (noteId) => {
  console.log('Deleting note with ID:', noteId);

  const resp = await fetch(baseUrl + '/' + noteId, {
    method: 'DELETE'
  });

  console.log('Server response:',resp);

  if (!resp.ok) {
    console.error('Failed to delete note:', resp.statusText);
    throw new Error('Failed to delete note');
  }

  return resp.json();
};

export const createNote = async (newNote) => {
  const resp = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(newNote),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!resp.ok) {
    throw new Error('Failed to create note');
  }

  return resp.json();
};