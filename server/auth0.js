const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

passport.use(
  new Auth0Strategy(
    {
      domain: "dev-sxqf1j7cxxvi2xk0.us.auth0.com",
      clientID: "hPT6AQ4XryAbMAsSlyh5QPyyJy9zq8EI",
      clientSecret:
        "lP3RcPlhWxNn4zos3aWdMGI65T0j0Ru2F9As81KssTxXLZP_nLWOOL96CM1qkNyr",
      callbackURL: "http://127.0.0.1:5500/client/src/datatable.html",
      audience: "http://localhost:3001/api",
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
