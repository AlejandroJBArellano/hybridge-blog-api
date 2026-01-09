const postService = require("../services/postService");
const postValidator = require("../validators/postValidator");

function getPosts(req, res) {
  res.json(postService.getAll());
}

function getPostById(req, res) {
  const id = parseInt(req.params.id, 10);
  const post = postService.getById(id);

  if (!post) {
    return res.status(404).json({ error: "Publicación no encontrada" });
  }

  res.json(post);
}

function createPost(req, res) {
  const errors = postValidator.validateCreate(req.body);
  if (errors.length) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const { title, content, author } = req.body;
  const newPost = postService.createPost({ title, content, author });
  res.status(201).json(newPost);
}

function updatePost(req, res) {
  const errors = postValidator.validateUpdate(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const id = parseInt(req.params.id, 10);
  const updatedPost = postService.updatePost(id, req.body);

  if (!updatedPost) {
    return res.status(404).json({ error: "Publicación no encontrada" });
  }

  res.json(updatedPost);
}

function deletePost(req, res) {
  const id = parseInt(req.params.id, 10);
  const deleted = postService.deletePost(id);

  if (!deleted) {
    return res.status(404).json({ error: "Publicación no encontrada" });
  }

  res.status(204).send();
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
