import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { v4 } from "uuid";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import AddEvent from "./AddEvent";

import FindEvent from "./FindEvent";

//////////////////////////////////////////////////////////////////

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

////////////////////////////////////////////////////////////////////////////

const Events = () => {
  // State
  const [events, setEvents] = useState([]);
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
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

  const renderHeader = () => {
    return (
      <>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell align="right">Name</StyledTableCell>
        <StyledTableCell align="right">DATE</StyledTableCell>
        <StyledTableCell align="right">DESCRIPTION</StyledTableCell>
        <StyledTableCell align="right">CATEGORY</StyledTableCell>
        <StyledTableCell align="right">ID</StyledTableCell>
        <StyledTableCell align="right">DELETE</StyledTableCell>
      </>
    );
  };

  const renderBody = () => {
    const categoryRegex = new RegExp(searchFilter, "i");
    const filteredEvent = events.filter((eve) => {
      return (
        categoryRegex.test(eve.category) ||
        categoryRegex.test(eve.name) ||
        categoryRegex.test(eve.date) ||
        categoryRegex.test(eve.description)
      );
    });
    return filteredEvent.map((eve, i) => {
      return (
        <StyledTableRow key={i}>
          <StyledTableCell component="th" scope="row">
            <Button
              onClick={() => {
                handleToggleFavorite(eve.id);
              }}
            >
              {eve.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
          </StyledTableCell>

          <StyledTableCell align="right">{eve.name}</StyledTableCell>
          <StyledTableCell align="right">{eve.date}</StyledTableCell>
          <StyledTableCell align="right">{eve.description}</StyledTableCell>
          <StyledTableCell align="right">{eve.category}</StyledTableCell>
          <StyledTableCell align="right">{eve.id}</StyledTableCell>
          <StyledTableCell align="right">
            <Button
              aria-label="delete"
              onClick={() => handleDeleteEvent(eve.id)}
            >
              {<DeleteIcon style={{ color: "red" }} />}
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  return (
    <section className="event-management">
      <FindEvent
        handleSearchEvent={handleSearchEvent}
        handleToggleFavPage={handleToggleFavPage}
      />
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>{renderHeader()}</TableRow>
            </TableHead>
            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>

        <AddEvent onAdd={handleAddEventOnSubmit} />
      </div>
    </section>
  );
};

export default Events;
