import { useState } from "react";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const marlin = { name: "Marlin", email: "marlin@gmail.com", id: "1" };
  const nemo = { name: "Nemo", email: "nemo@gmail.com", id: "2" };
  const dory = { name: "Dory", email: "dory@gmail.com", id: "3" };

  const [users, setUsers] = useState([marlin, nemo, dory]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState();

  const listUsers = users.map((user, index) => (
    <li key={index}>
      ID: {user.id} NAME:{user.name} EMAIL:{user.email}
    </li>
  ));

  // Add user
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { id, name, email };

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
    setId("");
  };

  // Delete user
  const handleDeleteUser = (deleteUser) => {
    const deleteUsers = users.filter((user) => user.id !== deleteUser);
    console.log(deleteUsers);
    setUsers(deleteUsers);
  };

  return (
    <>
      {" "}
      <section className="user-management">
        <h2>User Management</h2>

        <ul id="users-list">
          {/* display all existing Users here */}
          {listUsers}
        </ul>

        <div>
          <h3>Add User</h3>
          <form id="add-user" action="#" onSubmit={handleSubmit}>
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
        </div>
        {/* Delete user */}
        <DeleteUser handleDeleteUser={handleDeleteUser} />
      </section>
    </>
  );
};

export default Users;

// value field in form help in reset the input field and make form as a controlled component
