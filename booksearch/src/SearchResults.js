import React, { useState } from 'react';
import './App.css'; 
import BookList from './BookCard'; 

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
      <BookList searchTerm={searchTerm} />
    </div>
  );
};

export default SearchResults;
