// Usuarios del sistema (en una aplicación real usarías una base de datos)
const bcrypt = require('bcryptjs');

// Hash de contraseña "admin123"
const adminPasswordHash = bcrypt.hashSync('admin123', 10);

let users = [
  {
    id: 1,
    username: 'admin',
    password: adminPasswordHash,
    email: 'admin@hybridge.com',
    role: 'admin'
  }
];

module.exports = users;
