import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Gjør API-kallet med fetch
        const response = await fetch(`https://openlibrary.org/search.json?q=james+bond+series`);
        // Konverter responsen til JSON-format
        const data = await response.json();
        // Filtrer ut bøker som ikke tilhører James Bond-serien
        const jamesBondBooks = data.docs.filter(book => book.title.toLowerCase().includes('james bond'));
        // Sett seriene i tilstanden
        setBooks(jamesBondBooks);
      } catch (error) {
        // Håndter eventuelle feil
        console.error('Error fetching books:', error);
        setBooks([]);
      }
    };

    // Kall fetchBooks-funksjonen når komponenten lastes
    fetchBooks();
  }, []); // Tomt avhengighetsarray betyr at useEffect kjører kun ved først render

  return (
    <div>
      <h2>James Bond Series</h2>
      <ul>
        {/* Map gjennom seriene og vis dem */}
        {books.map((book, index) => (
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
