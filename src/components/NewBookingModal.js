import React, { useState, useEffect } from "react";
import "./NewBookingModal.css";

function NewBookingModal({ isOpen, onClose, onSave, selectedRoom }) {
  const [title, setTitle] = useState("");
  const [space, setSpace] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    const tzOffset = now.getTimezoneOffset() * 60000;
    return new Date(now - tzOffset).toISOString().slice(0, 16);
  };

  const [date, setDate] = useState(getCurrentDateTime());
  const [duration, setDuration] = useState("30");

  useEffect(() => {
    if (selectedRoom) {
      setTitle(`Booking for ${selectedRoom.name}`);
      setSpace(selectedRoom.name);
    }
  }, [selectedRoom]);

  const handleSave = (e) => {
    e.preventDefault();
    const newBooking = {
      title,
      space,
      date,
      duration,
      system_id: selectedRoom ? selectedRoom.id : undefined,
    };
    onSave(newBooking);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Booking</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="title">
              Title<span className="asterisk">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="space">Space</label>
            <input
              id="space"
              type="text"
              value={space}
              onChange={(e) => setSpace(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateTime">Date</label>
              <input
                id="dateTime"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewBookingModal;
