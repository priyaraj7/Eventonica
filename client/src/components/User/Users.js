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
import DeleteUser from "./DeleteUser";
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

  // Mock Data

  const marlin = { name: "Marlin", email: "marlin@gmail.com", id: "1" };
  const nemo = { name: "Nemo", email: "nemo@gmail.com", id: "2" };
  const dory = { name: "Dory", email: "dory@gmail.com", id: "3" };

  const [users, setUsers] = useState([marlin, nemo, dory]);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [id, setId] = useState();

  const listUsers = users.map((user, index) => (
    <li key={index}>
      ID: {user.id} NAME:{user.name} EMAIL:{user.email}
    </li>
  ));

  // Add user
  const handleAddOnSubmit = (newUser) => {
    const existingUses = users.filter((u) => u.id !== newUser.id);
    setUsers([...existingUses, { ...newUser }]);
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

        {/* <ul id="users-list">
         
          {listUsers}
        </ul> */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>{renderHeader()}</TableRow>
            </TableHead>
            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>
        <AddUser handleAddOnSubmit={handleAddOnSubmit} />

        {/* <div>
          <h3>Add User</h3>
          <form id="add-user" action="#" onSubmit={handleAddOnSubmit}>
            <fieldset>
              <label>Id:</label>
              <input
                value={id}
                type="text"
                id="add-user-id"
                placeholder="id"
                name="id"
                required
                onChange={(e) => setId(e.target.value)}
              />
              <label>Name:</label>
              <input
                value={name}
                type="text"
                id="add-user-name"
                placeholder="name"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email:</label>
              <input
                value={email}
                type="email"
                id="add-user-email"
                placeholder="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            <input type="submit" value="Add" />
          </form>
        </div> */}
        {/* Delete user */}
        {/* <DeleteUser handleDeleteUser={handleDeleteUser} /> */}
      </section>
    </>
  );
};

export default Users;

// value field in form help in reset the input field and make form as a controlled component
