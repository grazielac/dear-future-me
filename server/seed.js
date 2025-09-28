// This is usually a script to populate your database with initial or dummy data.
// run: node seed.js
// it doesn't start the server, just inserts data
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

(async () => {
  try {
    await db.query("DELETE FROM LETTERS");

    // insert new rows
    await db.query(
      `INSERT INTO letters (name, email, message) 
      VALUES ('Graziela', 'graziela@gmail.com', 'Hi good morning how are you im hungry!!')`
    );
    await db.query(
      `INSERT INTO letters (name, email, message) 
      VALUES ('Kent', 'kent@gmail.com', 'Did you know that hot water will turn into ice faster than cold water.')`
    );
    await db.query(
      `INSERT INTO letters (name, email, message) 
     VALUES ('Carley', 'carley@gmail.com', 'The Mona Lisa has no eyebrows.')`
    );
    console.log("Data seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await db.end();
  }
})();
