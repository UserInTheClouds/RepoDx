import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import prisma from '../utilities/db.js'

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.GITHUB_CALLBACK_URL}/api/auth/github/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await prisma.user_account.upsert({
            where: { github_id: profile.id },
            update: {
                access_token: accessToken,
                username: profile.username
            },
            create: {
                github_id: profile.id,
                username: profile.username,
                access_token: accessToken
            }
        })
        return done(null, user);
    }
    catch (error) {
        return done(error, null);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user_account.findUnique({
            where: { id: id }
        });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport