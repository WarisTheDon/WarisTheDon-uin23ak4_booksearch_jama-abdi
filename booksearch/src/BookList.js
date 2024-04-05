import React, { useState, useEffect } from 'react';

const BookList = ({ searchTerm }) => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Effekt for å laste inn James Bond-bøker når searchTerm er tomt
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=james+bond+series`);
        const data = await response.json();
        const jamesBondBooks = data.docs.filter(book => book.title.toLowerCase().includes('james bond'));
        setBooks(jamesBondBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      }
    };

    // Kjør fetchBooks kun hvis searchTerm er tomt
    if (!searchTerm) {
      fetchBooks();
    }
  }, [searchTerm]);

  // Effekt for å søke etter bøker når searchTerm endres
  useEffect(() => {
    const fetchSearchResults = async () => {
      // Søk kun hvis searchTerm er minst tre tegn
      if (searchTerm && searchTerm.length >= 3) {
        try {
          const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
          const data = await response.json();
          setSearchResults(data.docs);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]); // Tøm søkeresultatene hvis searchTerm ikke er lang nok
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  // Velger hvilken liste som skal vises basert på om det er et søk eller ikke
  const renderBooks = searchTerm ? searchResults : books;

  return (
    <div>
      <h2>{searchTerm ? 'Search Results' : 'James Bond Series'}</h2>
      <ul>
        {renderBooks.map((book, index) => (
          <li key={index}>
            <div>Title: {book.title}</div>
            <div>Author: {book.author_name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
