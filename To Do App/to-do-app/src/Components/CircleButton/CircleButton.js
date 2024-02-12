import React from 'react';
import './CircleButton.scss';
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

const CircleButton = ({ openModal }) => {
  const handleClick = () => {
    // Call the openModal function to open the modal
    openModal();
  };
  return (
    <Button className="circle-button" onClick={handleClick}>
      <BsPlus />
    </Button>
  );
};

export default CircleButton;
