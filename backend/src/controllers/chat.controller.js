import OpenAI from 'openai';
import Chat from '../models/Chat.js';
import { buildPrompt } from '../utils/promptBuilder.js';
import { isUnsafe } from '../utils/safetyCheck.js';

import dotenv from 'dotenv';
dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const chatWithAI = async (req, res) => {
    try {
        const {personality, usageDays, lifestyle, question} = req.body;

        if(isUnsafe(question)){
            return res.json({
                reply:"I can’t help with medical or injury-related questions. Please consult a certified doctor or professional."
            });
        }
        

        const prompt = buildPrompt({
            personality,
            usageDays,
            lifestyle,
            question
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages:[{role:"user", content:prompt}],
        });

        const aiText = response.choices[0].message.content;

        //save to db
        await Chat.create({
            userMessage: question,
            aiResponse: aiText,
            personality,
            usageDays,
            lifestyle
        });

        return res.json({reply: aiText});

    } catch (error) {
        return res.status(500).json({error: 'An error occurred while processing your request.'});
    }
};