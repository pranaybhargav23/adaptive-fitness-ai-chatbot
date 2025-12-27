import express from 'express';
import { chatWithAI, getChatHistory, getCurrentCoinCount } from '../controllers/chat.controller.js';


const router = express.Router();

router.post('/', chatWithAI);
router.get('/history', getChatHistory); 
router.get('/coins', getCurrentCoinCount);

export default router;