// runs express server -> connects to your database
// GET ROUTE. allows client to fetch all guestbook letters
import express from "express"; // imports the express library
import pg from "pg"; // imports PostgreSQL client library
import dotenv from "dotenv"; // loads secret environment variables from .env into process.env
import cors from "cors";
import path from "path";

dotenv.config(); // loads .env file

// instantiate the server
const app = express();

// set up middleware
// so our server can read json
app.use(express.json());
app.use(cors()); // allows our server to talk to other servers

// set VIEW EJS engine
// AI used to set this up
//tells express to use ejs templates from the /views folder
app.set("view engine", "ejs");
app.set("views", "./views"); //folder for your EJS templates

app.use(express.static("public"));

app.get("/about", (req, res) => {
  res.render("pages/about"); // this will include header + footer
});

app.get("/read", (req, res) => {
  res.render("pages/read"); // this will include header + footer
});

app.get("/write", (req, res) => {
  res.render("pages/write"); // this will include header + footer
});

// set up database connection
const db = new pg.Pool({
  connectionString: process.env.DB_CONN, // gets your DB connection string from .env
});

// GET Route (retrieve data)
// make the /letters route actually fetch data from your DB
app.get("/letters", async (req, res) => {
  // fetch data, dont change anything
  try {
    const result = await db.query("SELECT * FROM letters");
    res.json(result.rows); // send the rows back to the client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//POST new letter
app.post("/letters", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, message } = req.body; // get the data sent by the client

    // Validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required" });
    }

    const result = await db.query(
      "INSERT INTO letters (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );
    console.log("Inserted row:", result.rows[0]);
    // send back a response to the client
    res.status(201).json({
      status: "success",
      message: "Letter added",
      letter: result.rows[0],
    });
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// add a port + start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
