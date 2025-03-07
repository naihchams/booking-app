import React, { useState } from "react";
import "./BookingPage.css";
import sampleRoom from "./assets/accelerate.jpeg";
import iconHome from "./assets/home.png";
import iconBookings from "./assets/location.png";
import iconLocation from "./assets/house-door.png";

import iconProfile from "./assets/schedule.png";
import iconHeart from "./assets/heart.png";
import logoPlaceOs from "./assets/KJTech.png";
import logoDff from "./assets/dff_logo.png";
import SearchFilterMUI from "./components/searchFilters";
import SearchFilter from "./components/searchFilters";
import RoomCard from "./components/RoomCard";
import NewBookingModal from "./components/NewBookingModal";
import BookingSuccessModal from "./components/BookingSuccessModal";
import FilterModal from "./components/FilterModal";

function BookingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ date: "", time: "" });

  const roomsData = [
    {
      id: 1,
      name: "S1",
      location: "DFA",
      capacity: 2,
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      availability: [
        { date: "2025-03-01", times: ["08:00", "09:00", "10:00"] },
        { date: "2025-03-02", times: ["09:00", "10:00", "11:00"] },
      ],
      booked: false,
    },
    {
      id: 2,
      name: "S2",
      location: "DFA",
      capacity: 4,
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      availability: [
        { date: "2025-03-11", times: ["12:00", "13:00", "14:00"] },
        { date: "2025-03-03", times: ["08:00", "09:00", "10:00"] },
      ],
      booked: true,
    },
    {
      id: 3,
      name: "Accelerate",
      location: "DFA",
      capacity: 9,
      availability: [
        { date: "2025-03-02", times: ["08:00", "09:00", "10:00", "11:00"] },
        { date: "2025-03-04", times: ["14:00", "15:00", "16:00"] },
      ],
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      booked: false,
    },
    {
      id: 4,
      name: "Collaborate",
      location: "DFA",
      capacity: 6,
      availability: [
        { date: "2025-03-01", times: ["08:00", "09:00"] },
        { date: "2025-03-05", times: ["10:00", "11:00"] },
      ],
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      booked: false,
    },
    {
      id: 5,
      name: "Collaborate",
      location: "DFA",
      capacity: 6,
      availability: [
        { date: "2025-03-03", times: ["13:00", "14:00"] },
        { date: "2025-03-06", times: ["08:00", "09:00"] },
      ],
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      booked: false,
    },
  ];

  const handleBookClick = (roomId) => {
    console.log("Booking room with ID:", roomId);
    setIsModalOpen(true);
  };

  const handleSaveBooking = (newBooking) => {
    console.log("New Booking:", newBooking);
    setLastBooking(newBooking);

    setIsModalOpen(false);

    setIsSuccessOpen(true);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredRooms = roomsData.filter((room) => {
    if (filters.date) {
      const availForDate = room.availability.find(
        (avail) => avail.date === filters.date
      );
      if (!availForDate) return false;
      if (filters.time) {
        return availForDate.times.includes(filters.time);
      }
      return true;
    }
    if (filters.time) {
      return room.availability.some((avail) =>
        avail.times.includes(filters.time)
      );
    }
    return true;
  });

  return (
    <div className="booking-page">
      <header className="booking-header">
        <div className="header-left">
          <img
            src={logoDff}
            alt="Left Logo"
            className="left-logo"
            width={"200px"}
          />
        </div>
        <div className="header-right">
          <img
            src={logoPlaceOs}
            alt="Right Logo"
            className="right-logo"
            width={"100px"}
          />
        </div>
      </header>

      <div className="content-area">
        <SearchFilter
          handleFilterClick={handleFilterClick}
          onFilterChange={handleFilterChange}
        />
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onBook={() => handleBookClick(room.id)}
          />
        ))}
      </div>

      <NewBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBooking}
      />

      <BookingSuccessModal
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
        bookingDetails={lastBooking}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
      />

      <nav className="bottom-nav">
        <div className="nav-item">
          <img src={iconHome} alt="Home" />
        </div>
        <div className="nav-item">
          <img src={iconBookings} alt="booking" />
        </div>
        <div className="nav-item">
          <img src={iconLocation} alt="location" />
        </div>
        <div className="nav-item">
          <img src={iconProfile} alt="Profile" />
        </div>
      </nav>
    </div>
  );
}

export default BookingPage;
