const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const users = require("./users");

// Secreto para firmar tokens (en producción, usar variable de entorno)
const JWT_SECRET =
  process.env.JWT_SECRET || "tu_secreto_muy_seguro_aqui_cambiar_en_produccion";

// Opciones para la estrategia JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

// Configurar estrategia JWT
passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    // Buscar usuario por ID del payload
    const user = users.find((u) => u.id === payload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

module.exports = {
  passport,
  JWT_SECRET,
};
