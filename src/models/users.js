const bcrypt = require("bcryptjs");

const adminPasswordHash = bcrypt.hashSync("admin123", 10);

const users = [
  {
    id: 1,
    username: "admin",
    password: adminPasswordHash,
    email: "admin@hybridge.com",
    role: "admin",
  },
];

module.exports = users;
