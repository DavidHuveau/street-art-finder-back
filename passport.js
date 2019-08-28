const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password",
      session: false
    },
    (login, password, cb) => {
      console.log(">>>>>", login, password, JWT_SIGN_SECRET);

      // const resultQuerySelect = `SELECT * FROM users WHERE email = ?;`;
      // connection.query(resultQuerySelect, [email], (err, data) => {
      //   // si une erreur est obtenue
      //   if (err) return cb(err);
      //   // console.log(data);

      //   // si les login/password ne sont pas bon
      //   if (!data || !data.length)
      //     return cb(null, false, { message: "Wrong email" });

      //   if (!bcrypt.compareSync(password, data[0].password))
      //     return cb(null, false, { message: "Wrong password" });

      //   // si l'utilisateur est ok on retourne l'objet user
      //   return cb(null, data[0]);
      // });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SIGN_SECRET
    },
    (jwtPayload, cb) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return cb(null, jwtPayload);
    }
  )
);
