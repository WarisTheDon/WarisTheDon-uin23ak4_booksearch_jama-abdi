import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchResults from './SearchResults'; // Endret import fra App til SearchResults

ReactDOM.render(
  <React.StrictMode>
    <SearchResults />
  </React.StrictMode>,
  document.getElementById('root')
);
