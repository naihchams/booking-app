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

  const roomsData = [
    {
      id: 1,
      name: "S1",
      location: "DFA",
      capacity: 2,
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      booked: false,
    },
    {
      id: 2,
      name: "S2",
      location: "DFA",
      capacity: 4,
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      booked: true,
    },
    {
      id: 3,
      name: "Accelerate",
      location: "DFA",
      capacity: 9,
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      booked: false,
    },
    {
      id: 4,
      name: "Collaborate",
      location: "DFA",
      capacity: 6,
      imageUrl:
        "https://t4.ftcdn.net/jpg/00/80/91/11/360_F_80911186_RoBCsyLrNTrG7Y1EOyCsaCJO5DyHgTox.jpg",
      booked: false,
    },
    {
      id: 5,
      name: "Collaborate",
      location: "DFA",
      capacity: 6,
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
        <SearchFilter handleFilterClick={handleFilterClick} />
        {roomsData.map((room) => (
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
