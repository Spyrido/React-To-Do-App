
import './Header.scss';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Filtering from '../Filtering/Filtering';
import SwitchButton from '../SwitchButton/SwitchButton';

export default function Header({ notes, onSearch, onFilterChange }) {
  const title = 'TO DO LIST';
  const [searchQuery, setSearchQuery] = useState('');
  const [setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Function to handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (typeof onSearch === 'function') {
      onSearch(query);
    }
  };

  // Function to handle search click
  const handleSearchClick = () => {
    if (typeof onSearch === 'function') {
      onSearch(searchQuery);
    }
  };
  

  return (
    <>
      <header className='header_title'>{title}</header>
      <div className="header-items">
        <SearchBar 
          searchQuery={searchQuery}
          onChange={handleSearchChange}
          onSearchClick={handleSearchClick}  
        />
        <Filtering onFilterChange={onFilterChange} onSearchClick={handleSearchClick} />
        <SwitchButton toggleDarkMode={toggleDarkMode} />
        <hr className="line"/>
        <br></br>
      </div>
      
    </>
  );
}