// runs express server -> connects to your database
// GET ROUTE. allows client to fetch all guestbook letters
import express from "express"; // imports the express library
import pg from "pg"; // imports PostgreSQL client library
import dotenv from "dotenv"; // loads secret environment variables from .env into process.env
import cors from "cors";

// instantiate the server
const app = express();

// set up middleware
// so our server can read json
app.use(express.json());

dotenv.config(); // loads .env file
app.use(cors()); // allows our server to talk to other servers

// set up database connection
const db = new pg.Pool({
  connectionString: process.env.DB_CONN, // gets your DB connection string from .env
});

// GET Route (retrieve data)
// make the /letters route actually fetch data from your DB
app.get("/letters", async (req, res) => { // fetch data, dont change anything
  try {
    const result = await db.query("SELECT * FROM letters"); 
    res.json(result.rows); // send the rows back to the client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST Route (add data) send data to the server (create a new letter)
app.post("/letters", async (req, res) => {
  const body = req.body;
  const lettersFromUsers = req.body.letters;

  const data = await db.query(
    `INSERT INTO letters (name, email) VALUES ($1, $2)`,
    [lettersFromUsers]
  );
  res.json({ status: "Letters inserted into database" });
});


// add a port + start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
