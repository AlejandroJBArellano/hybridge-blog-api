function validateLogin(payload) {
  const errors = [];
  if (!payload || !payload.username) {
    errors.push("Usuario es requerido");
  }
  if (!payload || !payload.password) {
    errors.push("Contraseña es requerida");
  }
  return errors;
}

module.exports = {
  validateLogin,
};
