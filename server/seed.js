import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

db.query(
  `INSERT INTO letters (name, email, message)
VALUES
('Kent', 'alice@mail.com', 'Hi future me!'),
('Chie', 'bob@mail.com', 'Don’t forget your goals');`
);
