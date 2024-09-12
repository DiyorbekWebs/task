import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUser, setEditingUser] = useState({ firstName: "", lastName: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);


  const addUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      setError("All fields are required.");
      return;
    }

    axios
      .post("https://dummyjson.com/users/add", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ firstName: "", lastName: "", email: "" });
        setError("");
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://dummyjson.com/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  const editUser = (user) => {
    setEditingUserId(user.id);
    setEditingUser({ lastName: user.lastName});
  };
  const saveUser = (id) => {
    if (!editingUser.firstName || !editingUser.lastName || !editingUser.email) {
      setError("All fields are required.");
      return;
    }

    axios
      .put(`https://dummyjson.com/users/${id}`, editingUser)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, ...response.data } : user
          )
        );
        setEditingUserId(null);
        setError("");
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div>
        <input
          type="text"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          placeholder="First Name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          placeholder="Last Name"
          className="border p-2 mr-2"
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          className="border p-2 mr-2"
        />
        <button
          onClick={addUser}
          className="ml-2 bg-blue-500 text-white p-2"
        >
          Add User
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            {editingUserId === user.id ? (
              <div className="flex">
                <input
                  type="text"
                  value={editingUser.lastName}
                  onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                  className="border p-2 mr-2"
                />
                <button
                  onClick={() => saveUser(user.id)}
                  className="bg-green-500 text-white p-2 mr-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>{user.firstName} {user.lastName} - {user.email}</span>
                <div>
                  <button
                    onClick={() => editUser(user)}
                    className="ml-2 bg-yellow-500 text-white p-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="ml-2 bg-red-500 text-white p-2"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
