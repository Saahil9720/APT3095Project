// AddTodo.js
import React, { useState } from "react";
import "./AddTodo.css"; // Import the CSS file

const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div className="container">
      {" "}
      {/* Use className instead of style */}
      <h2>Add New To-Do</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new to-do item..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
