// index.js
const express = require("express");
const posts = require("./posts");
const authors = require("./authors");

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Hybridge Blog Posts" });
});

// ==================== RUTAS DE AUTORES ====================

// POST - Crear un nuevo autor
app.post("/api/authors", (req, res) => {
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

// PUT - Actualizar un autor
app.put("/api/authors/:id", (req, res) => {
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

// DELETE - Eliminar un autor
app.delete("/api/authors/:id", (req, res) => {
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

// POST - Crear un nuevo post
app.post("/api/posts", (req, res) => {
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

// PUT - Actualizar un post
app.put("/api/posts/:id", (req, res) => {
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

// DELETE - Eliminar un post
app.delete("/api/posts/:id", (req, res) => {
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
