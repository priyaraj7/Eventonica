import React, { useReducer } from "react";
import { TextField, Button, Box } from "@mui/material";

const AddEvent = ({ onAdd }) => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const initialState = {
    id: "",
    name: "",
    date: "",
    description: "",
    category: "",
    isFavorite: false,
  };

  const reducer = (state, action) => {
    console.log(action, "this is the action");
    switch (action.type) {
      case "editName":
        console.log("Logged if the editName action is being dispatched");
        return { ...state, name: action.payload };

      case "editDescription":
        return { ...state, description: action.payload };

      case "editCategory":
        return { ...state, category: action.payload };

      case "editDate":
        return { ...state, date: action.payload };
      // case "editId":
      //   return { ...state, id: action.payload };
      case "save":
        onAdd({ ...state });
      case "clear":
        return { ...initialState };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);
  const formRef = React.useRef();
  return (
    <>
      <h3>Add Event</h3>
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
            e.preventDefault();
            if (formRef.current.reportValidity()) {
              dispatch({ type: "save", payload: {} });
            }
          }}
        >
          <TextField
            onChange={(event) =>
              dispatch({ type: "editName", payload: event.target.value })
            }
            value={state.name}
            label="Event name"
            variant="standard"
            required
          />
          <TextField
            onChange={(event) =>
              dispatch({ type: "editCategory", payload: event.target.value })
            }
            label="category"
            variant="standard"
            value={state.category}
            required
          />

          <TextField
            name="someDate"
            label="Date"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            onChange={(event) =>
              dispatch({ type: "editDate", payload: event.target.value })
            }
            value={state.date}
            required
          />
          <TextField
            onChange={(event) =>
              dispatch({ type: "editDescription", payload: event.target.value })
            }
            label="Description"
            variant="standard"
            multiline
            fullWidth
            required
            value={state.description}
          />
          {/* <TextField
            onChange={(ev) =>
              dispatch({ type: "editId", payload: ev.target.value })
            }
            label="id"
            variant="standard"
            required
            value={state.id}
          /> */}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddEvent;
