require('dotenv').config();
const express = require("express");
const axios = require("axios");
const passport = require("passport");

const router = express.Router();

router.get("/callback", (req, res, next) => {
  console.log("Callback route reached");
  passport.authenticate("auth0", async (err, user, info) => {
    if (err) {
      console.error("Passport authentication error:", err);
      return next(err);
    }
    if (!user) {
      console.error("Authentication failed");
      return res.redirect("/");
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      console.log("Callback route executed");

      const { code } = req.query;
      console.log("Received authorization code:", code);
      try {
        const auth0Response = await axios.post(
          `https://dev-sxqf1j7cxxvi2xk0.us.auth0.com/oauth/token`,
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code:code,
            redirect_uri: process.env.AUTH0_REDIRECT_URI,
          })
        );
        console.log("Auth0 token exchange response:", auth0Response);

        const accessToken = auth0Response.data.access_token;

        axios.default.headers.common["Authorization"] = `Bearer ${accessToken}`;

        const userResponse = await axios.get(
          "http://localhost:3001/api/auth/profile"
        );

        const { user, roles, permissions } = userResponse.data;
        console.log(user, roles, permissions);

        if (roles.includes('admin')) {
          res.redirect('http://localhost:3000/profile');
        } else {
          res.redirect('http://localhost:3000/client/src/datatable.html');
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        res.redirect("/");
      }
    });
  })(req, res, next);
});

router.get(
  "/login",
  passport.authenticate("auth0", { scope: "openid email profile" })
);

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  res.json({
    user: req.user,
    roles: ['admin'], 
    permissions: ['read:userinfo'], 
  });});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
