// EditTodo.js
import React, { useState } from "react";

const EditTodo = ({ todo, onUpdate }) => {
  const [text, setText] = useState(todo.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onUpdate(todo.id, text);
  };

  return (
    <div>
      <h2>Edit To-Do</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditTodo;
