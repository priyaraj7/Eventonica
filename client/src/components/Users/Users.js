import React, { useState, useEffect } from "react";
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

import AddUser from "./AddUser";

const Users = () => {
  // CSS
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
  //////

  const [users, setUsers] = useState([]);

  // Access your API from  React app

  console.log("users", users);

  const getUsers = async () => {
    const request = await fetch("http://localhost:4000/users");
    const result = await request.json();
    setUsers(result);
  };

  useEffect(() => {
    getUsers(); // useEffect will run getUsers() every time this component loads, as opposed to just the first time it is rendered.
  }, []);

  // Add user
  const handleAddOnSubmit = async (newUser) => {
    const existingUses = users.filter((u) => u.id !== newUser.id);
    setUsers([...existingUses, { ...newUser }]);

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    const request = await fetch("http://localhost:4000/users", requestOptions);

    const result = await request.json();
  };

  // Delete user
  const handleDeleteUser = (deleteUser) => {
    const deleteUsers = users.filter((user) => user.id !== deleteUser);
    console.log(deleteUsers);
    setUsers(deleteUsers);
  };

  const renderHeader = () => {
    return (
      <>
        <StyledTableCell>Id</StyledTableCell>
        <StyledTableCell align="right">Name</StyledTableCell>
        <StyledTableCell align="right">Email</StyledTableCell>
        <StyledTableCell align="right">DELETE</StyledTableCell>
      </>
    );
  };

  const renderBody = () => {
    return users.map((user, i) => {
      return (
        <StyledTableRow key={i}>
          <StyledTableCell>{user.id}</StyledTableCell>
          <StyledTableCell align="right">{user.name}</StyledTableCell>
          <StyledTableCell align="right">{user.email}</StyledTableCell>

          <StyledTableCell align="right">
            <Button
              aria-label="delete"
              onClick={() => handleDeleteUser(user.id)}
            >
              {<DeleteIcon style={{ color: "red" }} />}
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  return (
    <>
      {" "}
      <section className="user-management">
        <h2>User Management</h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>{renderHeader()}</TableRow>
            </TableHead>
            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>
        <AddUser handleAddOnSubmit={handleAddOnSubmit} />
      </section>
    </>
  );
};

export default Users;

// value field in form help in reset the input field and make form as a controlled component
