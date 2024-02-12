import './SwitchButton.scss'
import React, { useState, useEffect } from 'react';

export default function SwitchButton({toggleDarkMode}){
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // On component mount, check the initial theme preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
          setIsDarkMode(true);
        }
      }, []); 

    const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save theme preference to local storage
    };

    return(
        <>
        <svg className="switch-dark-light" onClick={toggleTheme} xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
            <rect width="38" height="38" rx="5" fill="#6C63FF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M19.1249 8.5488C19.3387 8.91735 19.321 9.3762 19.0791 9.72705C18.3455 10.7915 17.916 12.0806 17.916 13.4733C17.916 17.1243 20.8757 20.084 24.5266 20.084C25.9194 20.084 27.2085 19.6545 28.2729 18.9208C28.6238 18.6791 29.0826 18.6613 29.4512 18.8751C29.8197 19.089 30.0319 19.4962 29.9961 19.9208C29.5191 25.567 24.7867 30 19.0178 30C12.9328 30 8 25.0672 8 18.9822C8 13.2133 12.433 8.48087 18.0792 8.00392C18.5038 7.96806 18.911 8.18024 19.1249 8.5488ZM16.1799 10.6346C12.7045 11.8157 10.2036 15.1073 10.2036 18.9822C10.2036 23.8502 14.1498 27.7964 19.0178 27.7964C22.8927 27.7964 26.1843 25.2955 27.3654 21.8202C26.4741 22.1232 25.5191 22.2875 24.5266 22.2875C19.6587 22.2875 15.7124 18.3413 15.7124 13.4733C15.7124 12.4809 15.8768 11.5258 16.1799 10.6346Z" fill="#F7F7F7"/>
        </svg>
        </>
    );
}