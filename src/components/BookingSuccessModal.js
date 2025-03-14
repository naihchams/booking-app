import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./BookingSuccessModal.css";

function BookingSuccessModal({ isOpen, onClose, bookingDetails }) {
  if (!isOpen) return null;

  const { floor, roomName, date } = bookingDetails || {};

  let formattedDate = "";
  let formattedTime = "";
  if (date) {
    const bookingDate = new Date(date);
    formattedDate = bookingDate
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toLowerCase();
    formattedTime = bookingDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return (
    <div className="success-overlay" onClick={onClose}>
      <div className="success-content" onClick={(e) => e.stopPropagation()}>
        <FaCheckCircle className="success-icon" />
        <h2 className="success-title">Room booked!</h2>
        <p className="success-message">
          Your room booking for {floor}, {roomName}-{floor} has been
          successfully booked for {formattedDate} at {formattedTime}. Please
          allow up to 5 minutes for your booking to be approved.
        </p>
        <button className="return-button" onClick={onClose}>
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default BookingSuccessModal;
