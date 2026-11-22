"use strict";
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.json");

app.use(cors());
app.use(express.json());

// Read on every login so edits to users.json apply without restarting.
function loadUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required" });
  }

  let users;
  try {
    users = loadUsers();
  } catch (err) {
    console.error("Could not read users.json:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }

  const match = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!match) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: { username: match.username },
  });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
