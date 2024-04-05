import React, { useState, useEffect } from 'react';

const BookCard = ({ searchTerm }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (!searchTerm) {
          
          const response = await fetch(`https://openlibrary.org/search.json?q=james+bond+series`);
          const data = await response.json();
          const jamesBondBooks = data.docs.filter(book => book.title.toLowerCase().includes('james bond'));
          setBooks(jamesBondBooks);
        } else {
          
          const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm.toLowerCase()}`);
          const data = await response.json();
          setFilteredBooks(data.docs.filter(book => book.title)); 
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
        setFilteredBooks([]);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const getImageUrl = book => {
    return `https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'default'}-L.jpg`;
  };

  return (
    <div>
      {searchTerm ? (
        <div>
          <h2>Search Results</h2>
          <ul>
            {filteredBooks.map((book, index) => (
              <li key={index}>
                <div>Title: {book.title}</div>
                <div>First Published: {book.first_publish_year}</div>
                <div>Author: {book.author_name}</div>
                <div>Average Rating: {book.average_rating}</div>
                <img src={getImageUrl(book)} alt={book.title} className="book-image" />
                <a href={`https://www.amazon.com/s?k=${book.title}`} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>James Bond Series</h2>
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                <div>Title: {book.title}</div>
                <div>First Published: {book.first_publish_year}</div>
                <div>Author: {book.author_name}</div>
                <div>Average Rating: {book.average_rating}</div>
                <img src={getImageUrl(book)} alt={book.title} className="book-image" />
                <a href={`https://www.amazon.com/s?k=${book.title}`} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookCard;
