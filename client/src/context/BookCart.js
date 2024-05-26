import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        const storedBookList = JSON.parse(localStorage.getItem('bookList')) || [];
        setBookList(storedBookList);
    }, []);

    const contextValues = {
        bookList,
        setBookList
    };

    return (
        <BookContext.Provider value={contextValues}>
            {children}
        </BookContext.Provider>
    );
};
