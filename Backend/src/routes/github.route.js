import express from 'express'
import { getRepoData } from '../controllers/github.controller.js';

const router = express.Router();

router.post('/analyze-url', getRepoData);

export default router