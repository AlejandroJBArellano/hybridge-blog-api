const authors = require("../models/authors");

function getAll() {
  return authors;
}

function getById(id) {
  return authors.find((author) => author.id === id);
}

function createAuthor({ name, email, bio }) {
  const newAuthor = {
    id: authors.length + 1,
    name,
    email,
    bio: bio || "",
    createdAt: new Date(),
  };
  authors.push(newAuthor);
  return newAuthor;
}

function updateAuthor(id, { name, email, bio }) {
  const authorIndex = authors.findIndex((author) => author.id === id);
  if (authorIndex === -1) return null;

  if (name !== undefined) authors[authorIndex].name = name;
  if (email !== undefined) authors[authorIndex].email = email;
  if (bio !== undefined) authors[authorIndex].bio = bio;

  return authors[authorIndex];
}

function deleteAuthor(id) {
  const authorIndex = authors.findIndex((author) => author.id === id);
  if (authorIndex === -1) return false;
  authors.splice(authorIndex, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
