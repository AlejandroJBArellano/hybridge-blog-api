const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const { JWT_SECRET } = require("../config/environment");

function findByUsername(username) {
  return users.find((user) => user.username === username);
}

async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = {
  findByUsername,
  verifyPassword,
  generateToken,
};
