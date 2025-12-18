// index.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const posts = require("./posts");
const authors = require("./authors");
const users = require("./users");
const { passport, JWT_SECRET } = require("./auth");

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Inicializar Passport
app.use(passport.initialize());

// Middleware de autenticación
const authenticate = passport.authenticate("jwt", { session: false });

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Hybridge Blog Posts" });
});

// ==================== AUTENTICACIÓN ====================

// POST - Login (generar token JWT)
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son requeridos" });
  }

  // Buscar usuario
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // Verificar contraseña
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // Generar token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    message: "Login exitoso",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

// ==================== RUTAS DE AUTORES ====================

// POST - Crear un nuevo autor (protegido)
app.post("/api/authors", authenticate, (req, res) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y email son requeridos" });
  }

  const newAuthor = {
    id: authors.length + 1,
    name,
    email,
    bio: bio || "",
    createdAt: new Date(),
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// GET - Obtener todos los autores
app.get("/api/authors", (req, res) => {
  res.json(authors);
});

// GET - Obtener un autor específico por ID
app.get("/api/authors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const author = authors.find((a) => a.id === id);

  if (!author) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.json(author);
});

// PUT - Actualizar un autor (protegido)
app.put("/api/authors/:id", authenticate, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, bio } = req.body;

  const authorIndex = authors.findIndex((a) => a.id === id);

  if (authorIndex === -1) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  // Actualizar solo los campos proporcionados
  if (name !== undefined) authors[authorIndex].name = name;
  if (email !== undefined) authors[authorIndex].email = email;
  if (bio !== undefined) authors[authorIndex].bio = bio;

  res.json(authors[authorIndex]);
});

// DELETE - Eliminar un autor (protegido)
app.delete("/api/authors/:id", authenticate, (req, res) => {
  const id = parseInt(req.params.id);
  const authorIndex = authors.findIndex((a) => a.id === id);

  if (authorIndex === -1) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  authors.splice(authorIndex, 1);
  res.status(204).send();
});

// ==================== RUTAS DE PUBLICACIONES ====================

// GET - Obtener todos los posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// GET - Obtener un post específico por ID
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Publicación no encontrada" });
  }

  res.json(post);
});

// POST - Crear un nuevo post (protegido)
app.post("/api/posts", authenticate, (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author,
    date: new Date(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT - Actualizar un post (protegido)
app.put("/api/posts/:id", authenticate, (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Publicación no encontrada" });
  }

  // Actualizar solo los campos proporcionados
  if (title !== undefined) posts[postIndex].title = title;
  if (content !== undefined) posts[postIndex].content = content;
  if (author !== undefined) posts[postIndex].author = author;

  res.json(posts[postIndex]);
});

// DELETE - Eliminar un post (protegido)
app.delete("/api/posts/:id", authenticate, (req, res) => {
  const id = parseInt(req.params.id);

  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Publicación no encontrada" });
  }

  posts.splice(postIndex, 1);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
