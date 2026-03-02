import passport from "passport";
import Oauth20, { Profile } from "passport-google-oauth20";
import config from "./config";
import userModel from "../models/user.model";
import historyModel from "../models/history.model";
const GoogleStrategy = Oauth20.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb,
    ) {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return cb(new Error("No email returned from Google"), false);
        }
        const user = await userModel.findOne({ googleId: profile.id });
        if (!user) {
          let newUser = await userModel.create({
            accessToken,
            googleId: profile.id,
            userName: profile.displayName,
            email,
            photo: "https://res.cloudinary.com/dzzlezrnw/image/upload/v1772273504/default-profile_vselxi.png",
          });
          let history = await historyModel.create({ userId: newUser._id });
          return cb(null, newUser);
        }
        return cb(null, user);
      } catch (error) {
        cb(error, false);
      }
    },
  ),
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

export default passport;
