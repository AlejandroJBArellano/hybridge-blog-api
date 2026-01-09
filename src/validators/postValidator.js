function validateCreate(payload) {
  const errors = [];
  if (!payload || !payload.title) errors.push("El título es requerido");
  if (!payload || !payload.content) errors.push("El contenido es requerido");
  if (!payload || !payload.author) errors.push("El autor es requerido");
  return errors;
}

function validateUpdate(payload) {
  const errors = [];
  if (!payload) errors.push("No hay datos para actualizar");
  if (
    payload &&
    payload.title === undefined &&
    payload.content === undefined &&
    payload.author === undefined
  ) {
    errors.push("Debes enviar al menos un campo para actualizar");
  }
  return errors;
}

module.exports = {
  validateCreate,
  validateUpdate,
};
