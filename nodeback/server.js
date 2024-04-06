// Import express module
const express = require("express");
const cors = require("cors");
// Create an express application
const app = express();
const sql = require(
  'mssql'
);
// Define the port number
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Dummy data for to-do items
let todos = [
  { id: 1, text: "Learn Node.js" },
  { id: 2, text: "Build To-Do List API" },
];

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

    await createTable(poolConnection);
    console.log("table probably created- check")
  } catch (err) {
    console.error(err.message);
  }
}

app.get("/", (req, res) => {
  console.log("started");
});

async function createTable(poolConnection) {
  // Accept poolConnection as a parameter
  try {
    const request = poolConnection.request();

    // SQL query to create a table
    const query = `
      CREATE TABLE Todos (
        id INT PRIMARY KEY,
        text NVARCHAR(255)
      )
    `;

    // Execute the query
    await request.query(query);

    console.log("Table created successfully");
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
}


// Make the app listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
