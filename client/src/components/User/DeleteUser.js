import React, { useState } from "react";

const DeleteUser = ({ handleDeleteUser }) => {
  const [deleteUserId, setUserIdToDelete] = useState("");
  return (
    <>
      <div>
        <h3>Delete User</h3>
        <form
          id="delete-user"
          action="#"
          onSubmit={(ev) => {
            ev.preventDefault();

            handleDeleteUser(deleteUserId);
            setUserIdToDelete("");
          }}
        >
          <fieldset>
            <label>User ID</label>
            <input
              type="text"
              name="delete-user-id"
              id="delete-user-id"
              value={deleteUserId}
              onChange={(e) => setUserIdToDelete(e.target.value)}
            />
          </fieldset>
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default DeleteUser;
