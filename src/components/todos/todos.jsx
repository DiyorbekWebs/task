import React, { useState, useEffect } from "react";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/todos")
      .then((response) => setTodos(response.data.todos))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) {
      console.error("Todo cannot be empty");
      return;
    }

    axios
      .post("https://dummyjson.com/todos/add", {
        todo: newTodo,
        completed: false,
        userId: 1,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const saveEdit = (id) => {
    if (!editText.trim()) {
      console.error("Todo cannot be empty");
      return;
    }

    axios
      .put(`https://dummyjson.com/todos/${id}`, {
        todo: editText,
      })
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? response.data : todo
          )
        );
        setEditingTodo(null);
        setEditText("");
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`https://dummyjson.com/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
          className="border p-2"
        />
        <button
          onClick={addTodo}
          className="ml-2 bg-blue-500 text-white p-2"
        >
          Add Todo
        </button>
      </div>

      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center border-b py-2"
          >
            {editingTodo === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-2 flex-1"
                onBlur={() => saveEdit(todo.id)}
                autoFocus
              />
            ) : (
              <span className="flex-1">{todo.todo}</span>
            )}
            <div className="flex space-x-2">
              {editingTodo === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingTodo(todo.id);
                    setEditText(todo.todo);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-4 py-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
