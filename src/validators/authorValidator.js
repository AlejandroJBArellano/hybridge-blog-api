function validateCreate(payload) {
  const errors = [];
  if (!payload || !payload.name) errors.push("El nombre es requerido");
  if (!payload || !payload.email) errors.push("El email es requerido");
  return errors;
}

function validateUpdate(payload) {
  const errors = [];
  if (!payload) errors.push("No hay datos para actualizar");
  if (
    payload &&
    payload.name === undefined &&
    payload.email === undefined &&
    payload.bio === undefined
  ) {
    errors.push("Debes enviar al menos un campo para actualizar");
  }
  return errors;
}

module.exports = {
  validateCreate,
  validateUpdate,
};
