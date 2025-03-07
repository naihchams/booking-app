import React, { useState } from "react";
import "./SearchFilter.css";
import SearchBar from "./searchBar";
import FilterPanel from "./FilterPanel";

function SearchFilter({ handleFilterClick, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("Emirates Tower");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-filter-container">
      <div className="search-row">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
      </div>
      <FilterPanel
        handleFilterClick={handleFilterClick}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

export default SearchFilter;
