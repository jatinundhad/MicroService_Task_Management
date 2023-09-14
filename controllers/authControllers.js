import db from "../database/conn.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "vishv123";

export const registerController = async (req, res) => {
  const { username, password, email, first_name, last_name } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `INSERT INTO USERS (username, password, email, first_name, last_name, created_at) VALUES (?, ?, ?, ?, ?, NOW())`;
  const values = [username, hashedPassword, email, first_name, last_name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const user = { username, email };
    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token });
  });
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM USERS WHERE username = ?`;
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ error: "Authentication failed. User not found." });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ user }, secretKey, { expiresIn: "4d" });
      res.json({ message: "Login successful", token });
    } else {
      res
        .status(401)
        .json({ error: "Authentication failed. Incorrect password." });
    }
  });
};
