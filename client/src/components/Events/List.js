import FindEvent from "./FindEvent";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CircularProgress from "@mui/material/CircularProgress";

//////////////////////////////////////////////////////////////////

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hoover,
    color: theme.palette.primary.dark,
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

const ListEvents = ({
  handleAddEventOnSubmit,
  handleToggleFavorite,
  handleDeleteEvent,

  events,
}) => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState("");
  const [toggleFavPage, setToggleFavPage] = useState(false);

  const handleSearchEvent = (category) => {
    setSearchFilter(category);
  };

  // Toggle Favorite page
  const handleToggleFavPage = () => {
    setToggleFavPage(!toggleFavPage);
  };

  const renderHeader = () => {
    return (
      <>
        <StyledTableCell></StyledTableCell>
        {/* <StyledTableCell align="right">ID</StyledTableCell> */}
        <StyledTableCell align="left">Name</StyledTableCell>
        <StyledTableCell align="left">DATE</StyledTableCell>
        <StyledTableCell align="left">DESCRIPTION</StyledTableCell>
        <StyledTableCell align="left">CATEGORY</StyledTableCell>
        <StyledTableCell align="left">EDIT</StyledTableCell>

        <StyledTableCell align="left">DELETE</StyledTableCell>
      </>
    );
  };

  const renderBody = () => {
    const categoryRegex = new RegExp(searchFilter, "i");
    let filteredEvent = events.filter((eve) => {
      return (
        categoryRegex.test(eve.category) ||
        categoryRegex.test(eve.name) ||
        categoryRegex.test(eve.date) ||
        categoryRegex.test(eve.description)
      );
    });

    if (toggleFavPage) {
      filteredEvent = filteredEvent.filter((e) => e.isfavorite === true);
    }

    const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "short" });
    return filteredEvent.map((eve, i) => {
      return (
        <StyledTableRow key={i}>
          <StyledTableCell component="th" scope="row">
            <Button
              onClick={() => {
                handleToggleFavorite(eve.id);
              }}
            >
              {eve.isfavorite ? (
                <FavoriteIcon style={{ color: "#f54284" }} />
              ) : (
                <FavoriteBorderIcon style={{ color: "#f54284" }} />
              )}
            </Button>
          </StyledTableCell>

          <StyledTableCell align="left">{eve.name}</StyledTableCell>
          <StyledTableCell align="left">
            {dateFormatter.format(new Date(eve.date))}
          </StyledTableCell>
          <StyledTableCell align="left">{eve.description}</StyledTableCell>
          <StyledTableCell align="left">{eve.category}</StyledTableCell>

          <StyledTableCell align="left">
            {eve.saving ? (
              <CircularProgress />
            ) : (
              <Button
                aria-label="edit"
                onClick={() => navigate(`./edit/${eve.id}`)}
              >
                {<EditTwoToneIcon style={{ color: "orange" }} />}
              </Button>
            )}
          </StyledTableCell>
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
      <Box
        sx={{
          mx: "auto",
          // width: 200,
          p: 1,
          m: 1,
        }}
      >
        <FindEvent
          handleSearchEvent={handleSearchEvent}
          handleToggleFavPage={handleToggleFavPage}
        />
      </Box>
      <div>
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>{renderHeader()}</TableRow>
              </TableHead>
              <TableBody>{renderBody()}</TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box
          sx={{
            mx: "auto",
            width: 200,
            p: 1,
            m: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("./add");
            }}
          >
            Add Event
          </Button>
        </Box>

        {/* <AddEvent /> */}
      </div>
    </section>
  );
};

export default ListEvents;
