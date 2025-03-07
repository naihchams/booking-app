import React, { useState } from "react";
import "./SearchFilter.css";
import SearchBar from "./searchBar";
import FilterPanel from "./FilterPanel";

function SearchFilter({ handleFilterClick }) {
  const [searchQuery, setSearchQuery] = useState("Emirates Tower");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div className="search-filter-container">
      <div className="search-row">
        <SearchBar />
      </div>

      <FilterPanel handleFilterClick={handleFilterClick} />
    </div>
  );
}

export default SearchFilter;
