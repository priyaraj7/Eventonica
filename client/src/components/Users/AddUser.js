import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const AddUser = ({ handleAddOnSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  return (
    <>
      <h3>Add User</h3>
      <Box
        component="div"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form
          noValidate
          autoComplete="off"
          id="add-event"
          onSubmit={(e) => {
            handleAddOnSubmit({ name, id, email });
            e.preventDefault();
          }}
        >
          <TextField
            onChange={(e) => setId(e.target.value)}
            value={id}
            label="User Id"
            variant="standard"
            required
          />
          <TextField
            value={name}
            label="Name"
            variant="standard"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            value={email}
            label="Email"
            variant="standard"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddUser;

//https://devtrium.com/posts/how-to-use-react-usereducer-hook
