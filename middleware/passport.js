
import userModel from '../schema/user.js';
import { hashSync } from 'bcrypt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Jwt from 'jsonwebtoken';

export default function configurePassport(passport) {

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback',

      },
      async (accessToken, refreshToken, profile, done) => {
        try {

          const user = await userModel.findOne({ email: profile._json.email })
          if (user) {
            return done(null, user)
          }

          const hashPass = hashSync(profile._json.sub, 10)

          const newUser = await new userModel({
            name: profile._json.name,
            googleId: profile._json.sub,
            email: profile._json.email,
            password: hashPass

          }).save()

          if (newUser) {
            console.log("create acount succeess")
          }
          return done(null, newUser)


        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const userNoToken = await userModel.findById(id)
    const token = Jwt.sign({ id }, process.env.SECRET_TOKEN, {
      expiresIn: "1d"
    })
    const user = {
      user: userNoToken,
      token,
    }

    return done(null, user)
  });

}
