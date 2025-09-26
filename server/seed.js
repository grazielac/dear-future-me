// This is usually a script to populate your database with initial or dummy data.
// run: node seed.js
// it doesn't start the server, just inserts data
import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

