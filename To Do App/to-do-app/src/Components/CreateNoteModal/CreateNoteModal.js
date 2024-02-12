import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button, Form } from 'react-bootstrap';
import './CreateNoteModal.scss';

Modal.setAppElement('#root');

const CreateNoteModal = ({ showModal, handleClose, addNote }) => {
  const [noteTitle, setNoteTitle] = useState('');

  const handleSaveNote = () => {
    if (noteTitle.trim() !== '') {
      addNote({
        id: Date.now().toString(),
        title: noteTitle,
        completed: false,
      });
      handleClose();
    }
  };

  return (
    <Modal isOpen={showModal} onRequestClose={handleClose} contentLabel="Create New Note">
      <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Create New Note</h2>
        <Form>
          <Form.Group controlId="noteTitle">
            <Form.Control
              type="text"
              placeholder="Enter note title"
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

export default CreateNoteModal;
