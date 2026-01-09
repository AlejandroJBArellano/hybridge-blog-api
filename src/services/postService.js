const posts = require("../models/posts");

function getAll() {
  return posts;
}

function getById(id) {
  return posts.find((post) => post.id === id);
}

function createPost({ title, content, author }) {
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author,
    date: new Date(),
  };
  posts.push(newPost);
  return newPost;
}

function updatePost(id, { title, content, author }) {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return null;

  if (title !== undefined) posts[postIndex].title = title;
  if (content !== undefined) posts[postIndex].content = content;
  if (author !== undefined) posts[postIndex].author = author;

  return posts[postIndex];
}

function deletePost(id) {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return false;
  posts.splice(postIndex, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  createPost,
  updatePost,
  deletePost,
};
