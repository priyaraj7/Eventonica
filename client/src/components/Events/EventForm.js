import React, { useEffect, useReducer } from "react";
import { TextField, Button, Box } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const EventForm = ({ handleSubmit, id, name, date, description, category }) => {
  // const current = new Date();
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;

  const initialState = {
    id,
    name,
    date,
    description,
    category,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "editName":
        return { ...state, name: action.payload };

      case "editDescription":
        return { ...state, description: action.payload };

      case "editCategory":
        return { ...state, category: action.payload };

      case "editDate":
        return { ...state, date: action.payload };
      case "clear":
        return { ...initialState };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const formRef = React.useRef();

  return (
    <>
      <h3>Edit Event</h3>
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
              handleSubmit(state);
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
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              disablePast
              label="Date"
              value={state.date}
              onChange={(value) =>
                dispatch({ type: "editDate", payload: value })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/* <TextField
            name="someDate"
            label="Date"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            onChange={(event) =>
              dispatch({ type: "editDate", payload: event.target.value })
            }
            value={state.date}
            required
          /> */}
          <TextField
            onChange={(event) =>
              dispatch({
                type: "editDescription",
                payload: event.target.value,
              })
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

export default EventForm;
