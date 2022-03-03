import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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
import SearchIcon from "@mui/icons-material/Search";

import AddEvent from "./AddEvent";
import DeleteEvent from "./DeleteEvent";
import FindEvent from "./FindEvent";

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

// Mock data
const Event = () => {
  const mockEvents = [
    {
      id: "1",
      name: "Birthday",
      date: "2021-09-01",
      description: "A birthday party for my best friend",
      category: "Celebration",
    },

    {
      id: "2",
      name: "Graduation",
      date: "2021-08-01",
      description: "The class of 2021 graduates from East High",
      category: "Education",
    },

    {
      id: "3",
      name: "JS Study Session",
      date: "2021-10-01",
      description: "A chance to practice Javascript interview questions",
      category: "Education",
    },
  ];

  // State
  const [events, setEvents] = useState(mockEvents);
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Add Event
  const handleAddEventOnSubmit = (newEvent) => {
    // Filtering the event handler to make it idempotent
    // https://github.com/facebook/react/issues/16295
    const existingEvents = events.filter((e) => e.id !== newEvent.id);
    setEvents([...existingEvents, { ...newEvent, favorite: false }]);
  };

  // Delete Event
  const handleDeleteEvent = (id) => {
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
      return categoryRegex.test(eve.category);
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
      <FindEvent handleSearchEvent={handleSearchEvent} />
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
        {/* <DeleteEvent /> */}
      </div>
    </section>
  );
};

export default Event;
