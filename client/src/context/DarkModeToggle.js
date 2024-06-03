// DarkModeToggle.jsx
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize dark mode state based on local storage
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode === 'true';
    });

    useEffect(() => {
        // Update body class on component mount and whenever dark mode state changes
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        // Toggle dark mode state and update local storage
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    return (
        <div>
            <button onClick={toggleDarkMode} className='w-full text-left dark:text-white dark:hover:text-gray-900'>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
};

export default DarkModeToggle;
