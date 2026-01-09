const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET =
  process.env.JWT_SECRET || "tu_secreto_muy_seguro_aqui_cambiar_en_produccion";

module.exports = {
  PORT,
  JWT_SECRET,
};
