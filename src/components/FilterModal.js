import React, { useState, useEffect } from "react";
import "./FilterModal.css";

function FilterModal({ isOpen, onClose, onSave, defaultValues = {} }) {
  const [roomSize, setRoomSize] = useState("");
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [meetingRoom, setMeetingRoom] = useState(false);
  const [floor, setFloor] = useState("");

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleApplyClick = () => {
    const newFilters = {
      roomSize,
      onlyFavourites,
      meetingRoom,
      floor,
    };
    onSave?.(newFilters);
    onClose();
  };

  return (
    <div className="filter-overlay" onClick={handleOverlayClick}>
      <div className="filter-content" onClick={handleContentClick}>
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <hr />

        <h3>Select room size</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="roomSize"
              value="2"
              checked={roomSize === "2"}
              onChange={() => setRoomSize("2")}
            />
            Min. 2 people
          </label>
          <label>
            <input
              type="radio"
              name="roomSize"
              value="4"
              checked={roomSize === "4"}
              onChange={() => setRoomSize("4")}
            />
            Min. 4 people
          </label>
          <label>
            <input
              type="radio"
              name="roomSize"
              value="10"
              checked={roomSize === "10"}
              onChange={() => setRoomSize("10")}
            />
            Min. 10 people
          </label>
        </div>

        <hr />

        <h3>Level</h3>
        <div className="select-level">
          <select
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="custom-select"
          >
            <option value="">All levels</option>
            <option value="AREA 2071">Area 2071</option>
            <option value="DFA">DFA</option>
          </select>
        </div>

        <hr />

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={onlyFavourites}
            onChange={() => setOnlyFavourites(!onlyFavourites)}
          />
          Favorites
        </label>

        <button className="apply-button" onClick={handleApplyClick}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterModal;
