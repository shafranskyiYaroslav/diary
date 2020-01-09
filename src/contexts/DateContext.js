import React from 'react';

export const DateContext = React.createContext(
    {
        currentDate: '',
        selectedDate: '',
        setDate: () => {},
        notesArray: [],
        changeNotesArray: () => {},        
    }
)