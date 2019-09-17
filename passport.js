const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const AuthenticationController = require("./controllers/AuthenticationController");

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password",
      session: false
    },
    (login, password, cb) => {
      // console.log(">>>>>", login, password);
      AuthenticationController.getUserForLocalStrategy(login)
        .then(data => {
          // console.log(">" + JSON.stringify(data));
          if (!data)
            return cb(null, false, { message: "Wrong login" });

          if (!bcrypt.compareSync(password, data.password))
            return cb(null, false, { message: "Wrong password" });

          // if the user is ok we return the user object
          return cb(null, data);
        })
        .catch(err => {
          // console.log(err);
          if (err) return cb(err);
        });
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
