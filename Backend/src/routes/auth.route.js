import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;
const router = express.Router();

router.get('/github',passport.authenticate('github',{scope:['repo','read:user']}));

router.get('/github/callback',passport.authenticate('github',{failureRedirect:`${CLIENT_URL}/login`}),(req,res)=>{
    res.redirect(`${CLIENT_URL}/profile`);
});

export default router