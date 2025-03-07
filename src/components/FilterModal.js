import React, { useState } from "react";
import "./FilterModal.css";

function FilterModal({ isOpen, onClose, onSave, defaultValues = {} }) {
  const [roomSize, setRoomSize] = useState(defaultValues.roomSize || "");
  const [onlyFavourites, setOnlyFavourites] = useState(
    defaultValues.onlyFavourites || false
  );
  const [meetingRoom, setMeetingRoom] = useState(
    defaultValues.meetingRoom || false
  );
  const [bilateralRoom, setBilateralRoom] = useState(
    defaultValues.bilateralRoom || false
  );
  const [podRoom, setPodRoom] = useState(defaultValues.podRoom || false);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    const newFilters = {
      roomSize,
      onlyFavourites,
      meetingRoom,
      bilateralRoom,
      podRoom,
    };
    if (onSave) {
      onSave(newFilters);
    }
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <div className="filter-overlay" onClick={handleOverlayClick}>
      <div className="filter-content" onClick={handleContentClick}>
        <h2>Select room size</h2>
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

        <h2>Favourites</h2>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={onlyFavourites}
            onChange={() => setOnlyFavourites(!onlyFavourites)}
          />
          Only show favourite rooms
        </label>

        <hr />

        <h2>Facilities</h2>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={meetingRoom}
            onChange={() => setMeetingRoom(!meetingRoom)}
          />
          Meeting Room
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={bilateralRoom}
            onChange={() => setBilateralRoom(!bilateralRoom)}
          />
          Bilateral Room
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={podRoom}
            onChange={() => setPodRoom(!podRoom)}
          />
          Pod Room
        </label>

        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default FilterModal;
