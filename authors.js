// Almacenamiento en memoria para los autores
// (en una aplicación real usarías una base de datos)
let authors = [
  {
    id: 1,
    name: "Admin",
    email: "admin@hybridge.com",
    bio: "Administrador del blog",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Juan Pérez",
    email: "juan@hybridge.com",
    bio: "Desarrollador frontend",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "María García",
    email: "maria@hybridge.com",
    bio: "Desarrolladora backend",
    createdAt: new Date(),
  },
];

module.exports = authors;
