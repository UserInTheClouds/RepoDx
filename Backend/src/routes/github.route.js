import express from 'express'
import rateLimit from 'express-rate-limit'
import { getRepoData } from '../controllers/github.controller.js';

const router = express.Router();

const analyzeLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
        error: "Too many analysis requests. Please try again after 5 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: "Unauthorized request. Please log in." });
};

router.post('/analyze-url', isAuthenticated, analyzeLimiter, getRepoData);

export default router