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

import AddEvent from "./AddEvent";
import DeleteEvent from "./DeleteEvent";
import FindEvent from "./FindEvent";

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

  const renderHeader = () => {
    // return headerElement.map((header, index) => {
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
    // });
  };

  const renderBody = () => {
    return events.map((eve, i) => {
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

  const [events, setEvents] = useState(mockEvents);
  const [toggleFavorite, setToggleFavorite] = useState(false);

  const handleAddEventOnSubmit = (newEvent) => {
    setEvents([...events, { ...newEvent, favorite: false }]);
  };

  const handleDeleteEvent = (id) => {
    const deleteEvent = events.filter((eve) => eve.id !== id);
    setEvents(deleteEvent);
  };

  const handleToggleFavorite = (id) => {
    const event = events.find((ev) => ev.id === id);
    event.favorite = !event.favorite;
    setToggleFavorite(!toggleFavorite);
    setEvents(events);
  };

  return (
    <section className="event-management">
      <h2>Event Management</h2>
      <div>
        <h3>All Events</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>{renderHeader()}</TableRow>
            </TableHead>
            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>

        <AddEvent onAdd={handleAddEventOnSubmit} />
        <DeleteEvent />
        <FindEvent />
      </div>
    </section>
  );
};

export default Event;
