import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import "./App.css";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch to-do items");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async (text) => {
    try {
      const response = await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Failed to add to-do item");
      }
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTodo = async (id, newText) => {
    try {
      const response = await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      });
      if (!response.ok) {
        throw new Error("Failed to update to-do item");
      }
      const updatedTodo = await response.json();
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete to-do item");
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List App</h1>
      </header>
      <main>
        <TodoList todos={todos} />
        <AddTodo onAdd={handleAddTodo} />
        {/* Implement EditTodo and DeleteTodo components */}
        {todos.map((todo) => (
          <div key={todo.id}>
            <EditTodo todo={todo} onUpdate={handleUpdateTodo} />
            <DeleteTodo todo={todo} onDelete={handleDeleteTodo} />
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
