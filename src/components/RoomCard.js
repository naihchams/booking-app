import React from "react";
import { FaMapMarkerAlt, FaRegHeart } from "react-icons/fa"; // Example icons
import "./RoomCard.css";

function RoomCard({ room, onBook }) {
  const { name, location, capacity, imageUrl, booked } = room;

  return (
    <div className="room-card">
      <img src={imageUrl} alt={name} className="room-image" />

      <div className="room-details">
        <h3 className="room-name">{name}</h3>

        <div className="room-location">
          <FaMapMarkerAlt className="location-icon" />
          <span>{location}</span>
        </div>

        <p className="capacity">Capacity: {capacity}</p>

        {booked ? (
          <button className="booked-button" disabled>
            Booked
          </button>
        ) : (
          <button className="book-button" onClick={onBook}>
            Book
          </button>
        )}
      </div>

      <FaRegHeart className="favorite-icon" />
    </div>
  );
}

export default RoomCard;
