import React, { useState, useEffect } from "react";
import "./BookingPage.css";
import logoPlaceOs from "./assets/KJTech.png";
import logoDff from "./assets/dff_logo.png";
import SearchFilter from "./components/searchFilters";
import RoomCard from "./components/RoomCard";
import NewBookingModal from "./components/NewBookingModal";
import BookingSuccessModal from "./components/BookingSuccessModal";
import FilterModal from "./components/FilterModal";
import { fetchSystems } from "./api/systemApi";
// import { fetchPlaces } from "./api/placeApi";
import { fetchEvents } from "./api/eventApi";
import { fetchAvailibily } from "./api/availabilityApi";
import { createEvent } from "./api/eventApi";

const ACCELERATE_IMAGE =
  "https://kjtech-lab-bucket.s3.me-central-1.amazonaws.com/Accelerate.jpeg";

function BookingPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: "",
    time: "",
    roomSize: "",
    onlyFavourites: false,
    meetingRoom: false,
    floor: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadRooms() {
      try {
        const systemsResponse = await fetchSystems();
        const systems = systemsResponse.data
          .filter((system) => system.bookable)
          .map((system) => ({
            id: system.id,
            email: system.email,
            name: system.display_name || system.name,
            location: system.map_id || "Default Location",
            capacity: system.capacity,
            favourite: false,
            imageUrl:
              system.images?.[0] || system.name.contains("accelerate")
                ? ACCELERATE_IMAGE
                : "",
            availability: [],
            booked: false,
            zones: system.zones || [],
          }));
        setRooms([...systems]);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    }
    loadRooms();
  }, []);

  useEffect(() => {
    async function checkAvailability() {
      if (filters.date && filters.time) {
        const dateTimeStr = `${filters.date}T${filters.time}:00`;
        const periodStart = Math.floor(new Date(dateTimeStr).getTime() / 1000);
        const periodEnd = periodStart + 30 * 60;

        try {
          const availabilityData = await fetchAvailibily(
            periodStart,
            periodEnd
          );
          setRooms((prevRooms) =>
            prevRooms.map((room) => {
              const isBooked = availabilityData.find(
                (entry) => entry.system_id === room.id
              );
              return { ...room, booked: !!isBooked };
            })
          );
        } catch (error) {
          console.error("Error checking availability", error);
        }
      }
    }
    checkAvailability();
  }, [filters.date, filters.time]);

  const floors = [
    ...new Set(
      rooms
        .map((room) => room.location)
        .filter((location) => location !== undefined)
    ),
  ];

  const handleToggleFavorite = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, favourite: !room.favourite } : room
      )
    );
  };

  const handleBookClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleSaveBooking = async (newBooking) => {
    const newEventData = {
      event_start: Math.floor(new Date(newBooking.date).getTime() / 1000),
      event_end:
        Math.floor(new Date(newBooking.date).getTime() / 1000) +
        newBooking.duration * 60,
      attendees: [],
      system_id: newBooking.system_id,
      private: true,
      all_day: false,
      title: newBooking.title,
    };

    try {
      const createdEvent = await createEvent(newEventData);
      setIsModalOpen(false);
      setIsSuccessOpen(true);
    } catch (error) {
      console.error("Error creating event", error);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const filteredRooms = rooms.filter((room) => {
    if (room.booked) return false;

    if (
      searchQuery &&
      !room.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (filters.roomSize && room.capacity < parseInt(filters.roomSize, 10)) {
      return false;
    }

    if (filters.onlyFavourites && !room.favourite) {
      return false;
    }

    if (filters.floor && room.location !== filters.floor) {
      return false;
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
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          handleFilterClick={handleFilterClick}
          onFilterChange={handleFilterChange}
        />

        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onBook={() => handleBookClick(room)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <NewBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBooking}
        selectedRoom={selectedRoom}
      />

      <BookingSuccessModal
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
        bookingDetails={lastBooking}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSave={handleFilterChange}
        defaultValues={filters}
        floors={floors}
      />
    </div>
  );
}

export default BookingPage;
