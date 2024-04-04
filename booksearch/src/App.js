import React, { useState } from 'react';
import './App.css'; // Importer CSS-filen for styling

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const books = [
    { title: 'Book 1', author: 'Author 1' },
    { title: 'Book 2', author: 'Author 2' },
    { title: 'Book 3', author: 'Author 3' },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="title">Book Search App</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul className="book-list">
        {filteredBooks.map((book, index) => (
          <li key={index} className="book-item">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
