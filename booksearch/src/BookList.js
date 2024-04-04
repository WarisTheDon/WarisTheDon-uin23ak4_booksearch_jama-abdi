import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://openlibrary.org/search.json?q=james+bond');
        const data = await response.json();
        setBooks(data.docs); // Endret til data.docs siden API-responsen er i et annet format enn forventet
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>James Bond Books</h2>
      <ul>
        {books.map((book, index) => ( // Endret book.id til index fordi API-responsen ikke inkluderer unike IDer
          <li key={index}>
            <div>Title: {book.title}</div>
            <div>Author: {book.author_name}</div> // Endret til book.author_name fordi det er hvordan dataene er strukturert
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
