import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, Form } from 'react-bootstrap';
import './EditNoteModal.scss';

Modal.setAppElement('#root');

const EditNoteModal = ({ showModal, handleClose, onSave, initialTitle }) => {
  const [noteTitle, setNoteTitle] = useState(initialTitle || '');

  useEffect(() => {
    setNoteTitle(initialTitle || ''); // Ensure initialTitle is never undefined
  }, [initialTitle]);

  const handleSaveNote = () => {
    onSave({ title: noteTitle });
    handleClose();
  };

  return (
    <Modal isOpen={showModal} onRequestClose={handleClose} contentLabel="Edit Note">
      <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Edit Note</h2>
        <Form>
          <Form.Group controlId="noteTitle">
            <Form.Control
              type="text"
              placeholder="Note Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="form-control"
            />
          </Form.Group>
        </Form>
        <Button variant="secondary" onClick={handleClose} className="cancel-button">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveNote} className="save-button">
          Apply
        </Button>
      </div>
      </div>
    </Modal>
  );
};

export default EditNoteModal;
