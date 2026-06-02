import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from './middleware/passport.js'
import session from 'express-session'
import authRoutes from './routes/auth.route.js'
import PGStore from 'connect-pg-simple'
import userRoutes from './routes/user.route.js'
dotenv.config();

const app = express();
app.use(cors({
    origin:process.env.CLIENT_URL||"http://localhost:5173",
    credentials:true,
    methods:["GET","PUT","POST","OPTIONS","DELETE"],
    allowedHeaders:['Content-type','Authorization']
}))

app.set('trust proxy', 1);

app.use(session({
    store: new PGStore({
        conString:process.env.DATABASE_URL
    }),
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false, //CHANGE WHEN IN PRODUCTION
        httpOnly:true,
        sameSite:'lax',
        maxAge:24*60*60*1000
    }
}));

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth',authRoutes);

app.get(`/api/profile`,(req,res)=>{
    if(!req.isAuthenticated()){
        return res.status(401).json({error:"Unauthorized request. Please log in."});
    }
    res.json({
        message:"Logged in successfully. Handshake completed.",
        user_session_data:{
            db_id:req.user.id,
            github_username:req.user.username,
            created_at:req.user.created_at
        }
    });
});

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port ",process.env.PORT);
})
