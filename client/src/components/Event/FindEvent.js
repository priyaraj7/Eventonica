import { useState } from "react";
import { styled, alpha as white } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

// Or Create your Own theme:
const theme = createTheme({
  palette: {
    primary: {
      main: "#DCDCDC",
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: white(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: white(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function FindEvent({ handleSearchEvent }) {
  return (
    <>
      <h2>Event Management</h2>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" theme={theme}>
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleSearchEvent(e.target.value)}
              />
            </Search>
            <Button
              variant="contained"
              onClick={() => {
                handleSearchEvent();
              }}
            >
              Submit
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
