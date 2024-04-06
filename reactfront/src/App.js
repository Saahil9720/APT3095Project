import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import Completed from "./Completed";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-do list</h1>
        <h2>By Nayana Das and Saahil Vekariya</h2>
      </header>
      <main>
        <TodoList />
        <Completed/>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Todo App. All rights reserved.</p>
      </footer>
    </div>
  );
  // <Routes>
  //   <Route  path="/todo" element={<TodoList />} />
  // </Routes>
}

export default App;
