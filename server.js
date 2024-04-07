// Import express module
const express = require("express");
const cors = require("cors");
// Create an express application
const app = express();
const sql = require("mssql");
const bodyParser = require("body-parser");

// Define the port number
const port = 5000;
const path = require("path");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Middleware to parse JSON bodies
app.use(express.json());

const config = {
  user: "nayanasaahil",
  password: "Sn@663157",
  server: "nayanasaahilserver.database.windows.net",
  database: "nayanasaahildb",
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
  try {
    var poolConnection = await sql.connect(config);

    console.log("done connecting");
  } catch (err) {
    console.error(err.message);
  }
}

app.get("/todos", async (req, res) => {
  try {
    var poolConnection = await sql.connect(config);
    const result = await poolConnection.request().query("SELECT * FROM Todos"); // Assuming 'Todos' is your table name
    res.json(result.recordset); // Send the queried data as JSON response
  } catch (err) {
    console.error("Error retrieving todos:", err);
    res.status(500).send("Error retrieving todos");
  }
});

app.post("/todos", async (req, res) => {
  const { action } = req.body; // Extract the action from the request body
  try {
    var poolConnection = await sql.connect(config);
    // Execute SQL query to insert the new todo into the database
    await poolConnection
      .request()
      .input("action", sql.VarChar, action)
      .query("INSERT INTO Todos (action, done) VALUES (@action, 0)");

    res.sendStatus(201); // Send 201 Created response on successful insertion
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).send("Error adding todo");
  }
});

app.get("/todos-undone", async (req, res) => {
  try {
    var poolConnection = await sql.connect(config);
    const result = await poolConnection
      .request()
      .query("SELECT * FROM Todos WHERE done = 0"); // Assuming 'Todos' is your table name
    res.json(result.recordset); // Send the queried data as JSON response
  } catch (err) {
    console.error("Error retrieving todos:", err);
    res.status(500).send("Error retrieving todos");
  }
});
app.get("/todos-done", async (req, res) => {
  try {
    var poolConnection = await sql.connect(config);
    const result = await poolConnection
      .request()
      .query("SELECT * FROM Todos WHERE done = 1"); // Assuming 'Todos' is your table name
    res.json(result.recordset); // Send the queried data as JSON response
  } catch (err) {
    console.error("Error retrieving todos:", err);
    res.status(500).send("Error retrieving todos");
  }
});

app.delete("/todos/:action", async (req, res) => {
  const action = req.params.action; // Get todo ID from request parameters
  try {
    var poolConnection = await sql.connect(config);
    const request = poolConnection
      .request()
      .input("action", sql.NVarChar, action); // Define 'action' parameter with proper data type

    await request.query(`DELETE FROM Todos WHERE action = @action`); // Use parameterized query to avoid SQL injection

    res.sendStatus(204); // Send 204 No Content response on successful deletion
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Error deleting todo");
  }
});

app.post("/todo-complete/:action", async (req, res) => {
  const action = req.params.action; // Get todo ID from request parameters
  try {
    var poolConnection = await sql.connect(config);
    const request = poolConnection
      .request()
      .input("action", sql.NVarChar, action); // Define 'action' parameter with proper data type

    await request.query(`UPDATE Todos SET done = 1 WHERE action = @action`); // Use parameterized query to avoid SQL injection

    res.sendStatus(204); // Send 204 No Content response on successful deletion
  } catch (error) {
    console.error("Error completing todo:", error);
    res.status(500).send("Error completing todo");
  }
});

app.put("todo-edit/:action", async (req, res) => {});

app.get("/", (req, res) => {
  console.log("started");
});

app.use(express.static("./reactfront/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "reactfront", "build", "index.html"));
});

// Make the app listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
