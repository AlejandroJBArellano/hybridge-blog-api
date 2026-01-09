const express = require("express");
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const authorRoutes = require("./authorRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/authors", authorRoutes);

module.exports = router;
