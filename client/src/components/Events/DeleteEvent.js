import React from "react";

const DeleteEvent = () => {
  return (
    <div>
      <h3>Delete Event</h3>
      <form id="delete-event" action="#">
        <fieldset>
          <label>Event ID</label>
          <input type="number" min="1" id="delete-event-id" />
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  );
};

export default DeleteEvent;
