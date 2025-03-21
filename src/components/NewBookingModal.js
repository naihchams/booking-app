import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NewBookingModal.css";

function NewBookingModal({
  isOpen,
  onClose,
  onSave,
  selectedRoom,
  filterDate,
  filterTime,
}) {
  const [title, setTitle] = useState("");
  const [space, setSpace] = useState("");

  // Default current date/time
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now;
  };

  useEffect(() => {
    const newDate = getInitialDateTime();
    setStartDate(newDate);
  }, [filterDate, filterTime]);

  // Use filter values if available; otherwise, use the current date/time
  const getInitialDateTime = () => {
    if (filterDate && filterTime) {
      // Create a Date object by combining filterDate and filterTime.
      // Assuming filterDate is in "YYYY-MM-DD" format and filterTime is in "HH:mm"
      return new Date(`${filterDate}T${filterTime}:00`);
    }
    return getCurrentDateTime();
  };

  const [startDate, setStartDate] = useState(getInitialDateTime());
  const [endDate, setEndDate] = useState(() => {
    const d = new Date(startDate);
    d.setMinutes(d.getMinutes() + 30);
    return d;
  });
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    if (selectedRoom) {
      setTitle(`Booking for ${selectedRoom.name}`);
      setSpace(selectedRoom.name);
    }
  }, [selectedRoom]);

  useEffect(() => {
    // Update endDate whenever startDate or duration changes.
    const newEnd = new Date(startDate);
    newEnd.setMinutes(startDate.getMinutes() + duration);
    setEndDate(newEnd);
  }, [startDate, duration]);

  const handleEndTimeChange = (timeOnlyDate) => {
    const newEnd = new Date(startDate);
    newEnd.setHours(timeOnlyDate.getHours());
    newEnd.setMinutes(timeOnlyDate.getMinutes());

    setEndDate(newEnd);

    const diffMs = newEnd - startDate;
    const diffMins = Math.round(diffMs / 60000);
    setDuration(diffMins);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newBooking = {
      title,
      space,
      date: startDate.toLocaleString(),
      duration,
      system_id: selectedRoom?.id,
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
              <label htmlFor="startDate">Date</label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(selectedDate) => setStartDate(selectedDate)}
                showTimeSelect
                timeIntervals={15}
                dateFormat="MMM d, yyyy 'at' h:mm aa"
                className="date-picker-input start-date-picker"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">Duration</label>
              <DatePicker
                id="endTime"
                selected={endDate}
                onChange={handleEndTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat={`h:mm aa '(${duration} minutes)'`}
                className="date-picker-input"
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
