import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import dotenv from "dotenv"
import { userModel } from "../../models/userModel";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";

dotenv.config({path: ".env"});

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
        console.log(profile);
        const userName = profile.username;
        const new_user = userModel.addNewUser(userName);

        return done(null, new_user);
    },
);

passport.serializeUser(function(user: Express.User, done: (err: any, id?: number) => void) {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done: (err: any, user?: Express.User | false | null) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
