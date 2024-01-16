const express = require("express");
const cors = require("cors");

const { Sequelize, DataTypes } = require("sequelize");
const db = require("./models");
const sequelizeConfig = require("./config/config.json");
const { Mountains } = require("./models/Mountains");
const { Trails } = require("./models/Trails");

const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const axios = require("axios");

require("./auth0");
const { auth } = require('express-openid-connect');

const { requiresAuth } = require('express-openid-connect');



const app = express();
const PORT = 3001;

const sequelize = db.sequelize;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'mysecretakjakajksjijsjačjojsosjahkkkh',
  baseURL: 'http://localhost:3001',
  clientID: 'YlsrTRbCQxsRFgIrEEzXMyXaAENVQXcS',
  issuerBaseURL: 'https://dev-sxqf1j7cxxvi2xk0.us.auth0.com'
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
/* app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
const jwtCheck = auth({
  audience: "http://localhost:3001/api/profile",
  issuerBaseURL: "https://dev-sxqf1j7cxxvi2xk0.us.auth0.com/",
  tokenSigningAlg: "RS256",
}); */
app.use((req, res, next) => {
  console.log("Received access token:", req.headers.authorization);
  next();
});

const url = "http://localhost:3001/api/mountainsall";
const accessToken = "https://dev-sxqf1j7cxxvi2xk0.us.auth0.com/oauth/token";

fetch(url, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

axios
  .get("http://localhost:3001/profile", {
    headers: {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
//app.use("/api", jwtCheck);
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
/* const authRouter = require("./routes/Auth");
app.use("/api/auth", authRouter);
 */
// Routers
const mountainsRouter = require("./routes/Mountains");
app.use("/api/mountains", mountainsRouter);

const trailsRouter = require("./routes/Trails");
app.use("/api/trails", trailsRouter);

const mountainsallRouter = require("./routes/MountainsAll");
app.use("/api/mountainsall", mountainsallRouter);

const profileRouter = require("./routes/Profile");
app.get("/api/profile", (req, res) => {
  res.json({ message: "This is a protected endpoint!" });
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to db has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
