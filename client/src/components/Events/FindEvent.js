import { useState } from "react";
import { styled, alpha as white } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import InputBase from "@mui/material/InputBase";
import { createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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

export default function FindEvent({ handleSearchEvent, handleToggleFavPage }) {
  return (
    <>
      <h2>Event Management</h2>
      <Box>
        <AppBar position="static" theme={theme}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Search align="left">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search by name/ date/ description/ category"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => handleSearchEvent(e.target.value)}
                />
              </Search>
            </Box>

            <Tooltip title="Toggle favorite event">
              <IconButton
                onClick={() => {
                  handleToggleFavPage();
                }}
              >
                <FavoriteIcon style={{ color: "#f54284" }} fontSize="small" />
                Filter favorite
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
