import './Component.css';
import React, { useState } from 'react';


interface SearchProps {
    onSearch: (searchText: string) => void;
    label: string;
  }
  
  const Search: React.FC<SearchProps> = ({ onSearch, label }) => {
    const [searchText, setSearchText] = useState('');
    
  
    const handleSearch = () => {
     //how to fetch shit idk...
      onSearch(searchText);
   
    };
  
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };
    

  
    return (
    <div className="bar-container">
      <div className="search-container">
        <label>{label}</label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />  
      </div>
      </div>
    );
  };
  
  export default Search;