import './Filtering.scss';
import React, {useState, useRef, useEffect } from 'react';

export default function Filtering({ onFilterChange }){
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isListVisible, setListVisibility] = useState(false);
    const dropdownRef = useRef(null);

    const handleFilterChange = (filter) => {
      setSelectedFilter(filter);
      onFilterChange(filter);
      setListVisibility(false); // Close the list after selecting an option
    };
  
    const toggleListVisibility = () => {
      setListVisibility(!isListVisible);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setListVisibility(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);

    return(
        <div className={`filtering-container ${isListVisible ? 'show-list' : ''}`} ref={dropdownRef}>
            <button className="dropdown-btn" onClick={toggleListVisibility}>
                {selectedFilter}
                <img
                className="dropdown-icon"
                src="chevron-top.svg"
                alt="arrow icon"
                ></img>
            </button>
            <ul className="dropdown-list">
                <li onClick={() => handleFilterChange('All')}>All</li>
                <li onClick={() => handleFilterChange('Complete')}>Complete</li>
                <li onClick={() => handleFilterChange('Incomplete')}>Incomplete</li>
            </ul>
        </div>
    );
}