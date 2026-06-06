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

router.post('/analyze-url', analyzeLimiter, getRepoData);

export default router