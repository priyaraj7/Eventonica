import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const AddUser = ({ handleAddOnSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const formRef = React.useRef();

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
          ref={formRef}
          noValidate
          autoComplete="off"
          id="add-event"
          onSubmit={(e) => {
            if (formRef.current.reportValidity()) {
              handleAddOnSubmit({ name, email });
              setName("");
              setEmail("");
            }

            e.preventDefault();
          }}
        >
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
