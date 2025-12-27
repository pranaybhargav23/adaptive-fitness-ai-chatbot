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
        const { personality, usageDays, lifestyle, question } = req.body;

        if (isUnsafe(question)) {
            return res.json({
                reply: "I can’t help with medical or injury-related questions. Please consult a certified doctor or professional."
            });
        }


        const lastChat = await Chat.findOne().sort({ createdAt: -1 });
        const currentCoinCount = lastChat ? lastChat.coinCount : 0;
        const newCoinCount = currentCoinCount + 1;


        const prompt = buildPrompt({
            personality,
            usageDays,
            lifestyle,
            question
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });

        const aiText = response.choices[0].message.content;

        //save to db
        await Chat.create({
            userMessage: question,
            aiResponse: aiText,
            personality,
            usageDays,
            lifestyle,
            coinCount: newCoinCount,
        });

        return res.json({ reply: aiText });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

export const getChatHistory = async (req, res) => {
    try {
        const chatData = await Chat.find().sort({ createdAt: -1 }).limit(20);

        const chatDataFormatted = chatData.map(chat => ({
            id: chat._id,
            userMessage: chat.userMessage,
            coinCount: chat.coinCount,
        }));

        return res.json({ history: chatDataFormatted });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching chat history.' });
    }
}

export const getCurrentCoinCount = async (req, res) => {
    try {
        const lastChat = await Chat.findOne().sort({ createdAt: -1 });


        return res.json({ coinCount: lastChat.coinCount });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching coin count.' });
    }
}