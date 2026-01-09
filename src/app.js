const express = require("express");
const routes = require("./routes");
const { passport } = require("./config/passport");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Hybridge Blog Posts" });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.use(errorHandler);

module.exports = app;
