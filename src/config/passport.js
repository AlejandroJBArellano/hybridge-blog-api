const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const users = require("../models/users");
const { JWT_SECRET } = require("./environment");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    const user = users.find((candidate) => candidate.id === payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

module.exports = {
  passport,
};
