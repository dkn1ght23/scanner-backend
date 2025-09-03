import passport from "passport";

export const googleAuthMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false, // optional, if using JWT instead of sessions
});

export const googleCallbackAuth = passport.authenticate("google", {
  failureRedirect: "/login",
});
