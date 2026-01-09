const authorService = require("../services/authorService");
const authorValidator = require("../validators/authorValidator");

function getAuthors(req, res) {
  res.json(authorService.getAll());
}

function getAuthorById(req, res) {
  const id = parseInt(req.params.id, 10);
  const author = authorService.getById(id);

  if (!author) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.json(author);
}

function createAuthor(req, res) {
  const errors = authorValidator.validateCreate(req.body);
  if (errors.length) {
    return res.status(400).json({ error: "Nombre y email son requeridos" });
  }

  const { name, email, bio } = req.body;
  const newAuthor = authorService.createAuthor({ name, email, bio });
  res.status(201).json(newAuthor);
}

function updateAuthor(req, res) {
  const errors = authorValidator.validateUpdate(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const id = parseInt(req.params.id, 10);
  const updatedAuthor = authorService.updateAuthor(id, req.body);

  if (!updatedAuthor) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.json(updatedAuthor);
}

function deleteAuthor(req, res) {
  const id = parseInt(req.params.id, 10);
  const deleted = authorService.deleteAuthor(id);

  if (!deleted) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.status(204).send();
}

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
