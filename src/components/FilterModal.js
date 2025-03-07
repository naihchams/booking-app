import React, { useState, useEffect } from "react";
import "./FilterModal.css";

function FilterModal({ isOpen, onClose, onSave, defaultValues = {} }) {
  const [roomSize, setRoomSize] = useState("");
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [sRoom, setSRoom] = useState(false);
  const [collaborateRoom, setCollaborateRoom] = useState(false);
  const [accelerateRoom, setAccelerateRoom] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRoomSize(defaultValues.roomSize || "");
      setOnlyFavourites(defaultValues.onlyFavourites || false);
      setSRoom(defaultValues.sRoom || false);
      setCollaborateRoom(defaultValues.collaborateRoom || false);
      setAccelerateRoom(defaultValues.accelerateRoom || false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    const newFilters = {
      roomSize,
      onlyFavourites,
      sRoom,
      collaborateRoom,
      accelerateRoom,
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
            checked={sRoom}
            onChange={() => setSRoom(!sRoom)}
          />
          S Room
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={accelerateRoom}
            onChange={() => setAccelerateRoom(!accelerateRoom)}
          />
          Accelerate Room
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={collaborateRoom}
            onChange={() => setCollaborateRoom(!collaborateRoom)}
          />
          Collaborate Room
        </label>

        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default FilterModal;
