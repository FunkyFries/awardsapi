import passport from "passport";
import OutlookStrategy from "passport-outlook";
import { User } from "../models/users";

require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }).then(user => {
    done(null, user);
  });
});

export default passport.use(
  new OutlookStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      authorizationURL: process.env.OUTLOOK_AUTHORITY,
      tokenURL: process.env.OUTLOOK_TOKEN_URL,
      callbackURL: "/auth/outlook/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      await User.findOne({ profileId: profile.id }).then(currentUser => {
        if (currentUser) {
          console.log(currentUser);
          done(null, currentUser);
        } else {
          new User({
            profileId: profile.id,
            email: profile.EmailAddress
          })
            .save()
            .then(newUser => {
              console.log(newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
