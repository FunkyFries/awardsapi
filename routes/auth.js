import express from "express";
import passport from "passport";
const router = express.Router();

// Auth with outlook
router.get(
  "/outlook",
  passport.authenticate("windowslive", {
    scope: ["openid", "profile", "offline_access"]
  })
);

// Callback route for outlook strategy
router.get(
  "/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/outlook" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/students/");
  }
);

export default router;
