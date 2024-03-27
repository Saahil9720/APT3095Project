// Import express module
const express = require("express");

// Create an express application
const app = express();

// Define the port number
const port = 3000;

// Dummy data for to-do items
let todos = [
  { id: 1, text: "Learn Node.js" },
  { id: 2, text: "Build To-Do List API" },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all to-do items
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Route to add a new to-do item
app.post("/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: todos.length + 1, text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Route to update an existing to-do item
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex !== -1) {
    todos[todoIndex].text = text;
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: "To-do item not found" });
  }
});

// Route to delete a to-do item
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.sendStatus(204);
});

// Make the app listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
