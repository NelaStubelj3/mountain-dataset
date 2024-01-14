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

      try {
        const auth0Response = await axios.post(
          `https://dev-sxqf1j7cxxvi2xk0.us.auth0.com/oauth/token`,
          {
            grant_type: "authorization_code",
            client_id: "hPT6AQ4XryAbMAsSlyh5QPyyJy9zq8EI",
            client_secret:
              "lP3RcPlhWxNn4zos3aWdMGI65T0j0Ru2F9As81KssTxXLZP_nLWOOL96CM1qkNyr",
            code,
            redirect_uri: "http://127.0.0.1:5500/client/src/datatable.html",
          }
        );

        const accessToken = auth0Response.data.access_token;

        axios.default.headers.common["Authorization"] = `Bearer ${accessToken}`;

        const userResponse = await axios.get(
          "http://localhost:3001/api/auth/profile"
        );

        const user = userResponse.data;
        console.log(user);

        const redirectURL = `http://127.0.0.1:5500/client/src/datatable.html?user=${encodeURIComponent(
          JSON.stringify(user)
        )}`;
        res.redirect(redirectURL);
      } catch (error) {
        console.error("Error fetching user information:", error);
        res.redirect("/"); // Redirect to home on error
      }
    });
  })(req, res, next);
});

router.get(
  "/login",
  passport.authenticate("auth0", { scope: "openid email profile" })
);

// Profile route
router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  // User is authenticated, show profile
  res.json(req.user);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
