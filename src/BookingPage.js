import React, { useState, useEffect, useCallback } from "react";
import "./BookingPage.css";
import logoPlaceOs from "./assets/KJTech.png";
import logoDff from "./assets/dff_logo.png";
import SearchFilter from "./components/searchFilters";
import RoomCard from "./components/RoomCard";
import NewBookingModal from "./components/NewBookingModal";
import BookingSuccessModal from "./components/BookingSuccessModal";
import FilterModal from "./components/FilterModal";
import { fetchSystems } from "./api/systemApi";
import { fetchAvailability } from "./api/availabilityApi";
import { createEvent } from "./api/eventApi";
import { DateTime } from "luxon";

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
            location:
              system.name == "Accelerate"
                ? "Area 2071"
                : (system.name == "Collaborate" ? "Area 2071" : "DFA") ||
                  "Default Location",
            capacity: system.capacity,
            favourite: false,
            imageUrl: system.images?.[0] || ACCELERATE_IMAGE,
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
          const updatedRooms = await Promise.all(
            rooms.map(async (room) => {
              const availabilityData = await fetchAvailability(
                periodStart,
                periodEnd,
                room.id
              );
              const available = availabilityData && availabilityData.length > 0;
              return { ...room, booked: !available };
            })
          );
          setRooms(updatedRooms);
        } catch (error) {
          console.error("Error checking availability", error);
        }
      } else if (filters.date && !filters.time) {
        const dayStart = new Date(filters.date);
        dayStart.setHours(0, 0, 0, 0);
        const dateTimeStr = `${filters.date}T${filters.time}:00`;
        const periodStart = Math.floor(
          DateTime.fromISO(dateTimeStr, { zone: "Asia/Dubai" })
            .toUTC()
            .toSeconds()
        );
        const periodEnd = periodStart + 24 * 60 * 60;
        try {
          const updatedRooms = await Promise.all(
            rooms.map(async (room) => {
              const availabilityData = await fetchAvailability(
                periodStart,
                periodEnd,
                room.id
              );
              const available = availabilityData && availabilityData.length > 0;
              return { ...room, booked: !available };
            })
          );
          setRooms(updatedRooms);
        } catch (error) {
          console.error("Error checking availability", error);
        }
      } else if (!filters.date && filters.time) {
        const daysToCheck = 7;
        try {
          const updatedRooms = await Promise.all(
            rooms.map(async (room) => {
              let available = false;
              for (let i = 0; i < daysToCheck; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const [hours, minutes] = filters.time.split(":");
                date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
                const dateTimeStr = `${filters.date}T${filters.time}:00`;
                const periodStart = DateTime.fromISO(dateTimeStr, {
                  zone: "Asia/Dubai",
                })
                  .toUTC()
                  .toSeconds();
                const periodEnd = periodStart + 30 * 60;
                const availabilityData = await fetchAvailability(
                  periodStart,
                  periodEnd,
                  room.id
                );
                if (availabilityData && availabilityData.length > 0) {
                  available = true;
                  break;
                }
              }
              return { ...room, booked: !available };
            })
          );
          setRooms(updatedRooms);
        } catch (error) {
          console.error("Error checking availability", error);
        }
      }
    }

    checkAvailability();
  }, [filters.date, filters.time]);

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
      await createEvent(newEventData);
      setLastBooking({
        title: newBooking.title,
        date: newBooking.date,
        floor: selectedRoom.location,
        roomName: selectedRoom.name,
      });
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

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  const filteredRooms = rooms.filter((room) => {
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

    if (filters.floor === "DFA") {
      const nameLower = room.name.toLowerCase();
      if (!nameLower.includes("s1") && !nameLower.includes("s2")) {
        return false;
      }
    } else if (filters.floor === "AREA 2071") {
      const nameLower = room.name.toLowerCase();
      if (
        !nameLower.includes("collaborate") &&
        !nameLower.includes("accelerate")
      ) {
        return false;
      }
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
            alt="Left Logo"
            className="left-logo"
            width={"200px"}
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
      />
    </div>
  );
}

export default BookingPage;
