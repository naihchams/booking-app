import React from "react";
import { FaHeart, FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import "./RoomCard.css";

function RoomCard({ room, onBook, onToggleFavorite }) {
  const { id, name, location, capacity, imageUrl, favourite } = room;

  return (
    <div className="room-card" onClick={onBook}>
      <img src={imageUrl} alt={name} className="room-image" />

      <div className="room-details">
        <h3 className="room-name">{name}</h3>

        <div className="room-location">
          <FaMapMarkerAlt className="location-icon" />
          <span>{location}</span>
        </div>

        <p className="capacity">Capacity: {capacity}</p>
      </div>

      <div
        className="favorite-icon"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(id);
        }}
      >
        {favourite ? <FaHeart className="favorited" /> : <FaRegHeart />}
      </div>
    </div>
  );
}

export default RoomCard;
