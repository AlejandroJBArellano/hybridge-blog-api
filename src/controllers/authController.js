const authService = require("../services/authService");
const authValidator = require("../validators/authValidator");

async function login(req, res, next) {
  try {
    const errors = authValidator.validateLogin(req.body);
    if (errors.length) {
      return res
        .status(400)
        .json({ error: "Usuario y contraseña son requeridos" });
    }

    const { username, password } = req.body;
    const user = authService.findByUsername(username);

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isValidPassword = await authService.verifyPassword(
      password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = authService.generateToken(user);

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
