import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import "./SearchBar.css";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <FaSearch className="icon left-icon" />
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="search-bar-input"
      />
      <FiEdit3 className="icon right-icon" />
    </div>
  );
}

export default SearchBar;
