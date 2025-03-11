import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { FaChevronDown } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./FilterPanel.css";

function FilterPanel({ handleFilterClick, onFilterChange }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";

    onFilterChange({ date: formattedDate, time: selectedTime });
  }, [selectedDate, selectedTime, onFilterChange]);

  const getTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const value = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const minuteStr = String(minute).padStart(2, "0");
        const suffix = hour < 12 ? "AM" : "PM";
        const label = `${hour12}:${minuteStr} ${suffix}`;
        times.push({ value, label });
      }
    }
    return times;
  };

  const timeOptions = getTimeOptions();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <button className="dropdown date-picker-input" onClick={onClick} ref={ref}>
      {value || "Select Date"}
      <FaChevronDown className="dropdown-icon" style={{ marginLeft: 5 }} />
    </button>
  ));

  return (
    <div className="filter-panel">
      <div className="dropdown-row">
        <div className="filter-button-row">
          <button className="filter-button" onClick={handleFilterClick}>
            Filters <FaChevronDown className="filter-icon" />
          </button>
        </div>

        <div className="dropdown-group">
          <label htmlFor="date-input">Date:</label>
          <DatePicker
            id="date-input"
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Select a date"
            dateFormat="MMM d, yyyy"
            customInput={<CustomDateInput />}
          />
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
            {timeOptions.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
