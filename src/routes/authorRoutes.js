const express = require("express");
const authorController = require("../controllers/authorController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authorController.getAuthors);
router.get("/:id", authorController.getAuthorById);
router.post("/", authenticate, authorController.createAuthor);
router.put("/:id", authenticate, authorController.updateAuthor);
router.delete("/:id", authenticate, authorController.deleteAuthor);

module.exports = router;
