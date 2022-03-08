import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import ListEvents from "./List";

export default ListEvents = () => {
  // State
  const [events, setEvents] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [toggleFavPage, setToggleFavPage] = useState(false);

  // getting all events
  const getEvents = async () => {
    const request = await fetch("http://localhost:4000/events");
    const result = await request.json();
    setEvents(result);
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Add Event
  const handleAddEventOnSubmit = async (newEvent) => {
    // Filtering the event handler to make it idempotent, useReducer calls action multiple times
    // https://github.com/facebook/react/issues/16295
    const eventExists = events.find(
      (e) =>
        e.name === newEvent.name &&
        e.category === newEvent.category &&
        e.date === newEvent.date &&
        e.description === newEvent.description
    );
    if (eventExists) return;
    const tempId = v4();
    const newTempEvent = { ...newEvent, favorite: false, id: tempId };
    setEvents([...events, newTempEvent]);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    };
    const request = await fetch("http://localhost:4000/events", requestOptions);

    const result = await request.json();
    setEvents([
      ...events.filter((e) => e.id !== tempId),
      { ...newTempEvent, id: result.id },
    ]);
  };

  // Delete Event
  const handleDeleteEvent = async (id) => {
    let response = await fetch(`http://localhost:4000/events/${id}`, {
      method: "DELETE",
    });
    await response.json();

    const deleteEvent = events.filter((eve) => eve.id !== id);
    setEvents(deleteEvent);
  };

  // Edit Event
  const handleOnEdit = async (id) => {
    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    };
    const response = await fetch(
      `http://localhost:4000/events/${id}`,
      requestOptions
    );
    await response.json();
    // .then(data => this.setState({ postId: data.id }));
  };

  // Toggle Favorite
  const handleToggleFavorite = (id) => {
    const event = events.find((ev) => ev.id === id);
    event.favorite = !event.favorite;
    setToggleFavorite(!toggleFavorite);
    setEvents(events);
  };

  // Toggle Favorite page
  const handleToggleFavPage = () => {
    setToggleFavPage(!toggleFavPage);
  };

  // SearchEvent
  const handleSearchEvent = (category) => {
    setSearchFilter(category);
  };

  return (
    <Routes>
      <Route path="add" element={<AddEvent onAdd={handleAddEventOnSubmit} />} />
      <Route path="edit/:id" element={<EditEvent />} />
      <Route
        index={true}
        element={
          <ListEvents
            events={events}
            handleToggleFavorite={handleToggleFavorite}
          />
        }
      />
    </Routes>
  );
};
