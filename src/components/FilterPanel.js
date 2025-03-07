import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./FilterPanel.css";

function FilterPanel({ handleFilterClick }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div className="filter-panel">
      <div className="filter-button-row">
        <button className="filter-button" onClick={handleFilterClick}>
          Filter <FaChevronDown className="filter-icon" />
        </button>
      </div>

      <div className="dropdown-row">
        <div className="dropdown-group">
          <label htmlFor="date-dropdown">Date:</label>
          <select
            id="date-dropdown"
            className="dropdown"
            value={selectedDate}
            onChange={handleDateChange}
          >
            <option value="">Select Date</option>
            <option value="2025-03-01">2025-03-01</option>
            <option value="2025-03-02">2025-03-02</option>
            <option value="2025-03-03">2025-03-03</option>
          </select>
        </div>

        <div className="dropdown-group">
          <label htmlFor="time-dropdown">Time:</label>
          <select
            id="time-dropdown"
            className="dropdown"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            <option value="">Select Time</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
