import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Completed = () => {
  // State to store the todo list
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); // State to store the new todo input

  // Function to fetch todo list from the server
  const fetchTodoList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos-done");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:5000/todos", {
        action: newTodo,
      });
      fetchTodoList();
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to handle deletion of a todo
  const handleDelete = async (action) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${action}`);
      fetchTodoList();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // useEffect hook to fetch todo list when component mounts
  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Completed tasks</h5>
              <ul className="list-group mt-4">
                {todos.map((todo) => (
                  <li
                    key={todo.action}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ textDecoration: "line-through" }}
                  >
                    {todo.action}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(todo.action)} // Pass todo id to handleDelete function
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
