// DeleteTodo.js
import React from "react";

const DeleteTodo = ({ todo, onDelete }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div>
      <h2>Delete To-Do</h2>
      <p>Are you sure you want to delete "{todo.text}"?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTodo;
