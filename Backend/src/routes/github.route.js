import express from 'express'
import { getRepoData } from '../controllers/github.controller';

const router = express.Router();

router.post('/analyze',getRepoData);

export default router