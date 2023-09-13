import { Router } from "express";
import db from "../database/conn.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();
const secretKey = "vishv123";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user by username
  const query = `SELECT * FROM USERS WHERE username = ?`;
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      // User not found
      return res
        .status(401)
        .json({ error: "Authentication failed. User not found." });
    }

    // Check if the provided password matches the hashed password in the database
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Password is valid, generate a JWT token
      const token = jwt.sign({ user }, secretKey, { expiresIn: "4d" }); // Adjust expiration as needed
      res.json({ message: "Login successful", token });
    } else {
      // Passwords do not match
      res
        .status(401)
        .json({ error: "Authentication failed. Incorrect password." });
    }
  });
});

router.post("/register", async (req, res) => {
  const { username, password, email, first_name, last_name } = req.body;

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insert the user data into the database
  const sql = `INSERT INTO USERS (username, password, email, first_name, last_name, created_at) VALUES (?, ?, ?, ?, ?, NOW())`;
  const values = [username, hashedPassword, email, first_name, last_name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Create a JWT token
    const user = { username, email }; // Customize the user data as needed
    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" }); // Adjust expiration as needed

    res.status(201).json({ message: "User registered successfully", token });
  });
});

export default router;
