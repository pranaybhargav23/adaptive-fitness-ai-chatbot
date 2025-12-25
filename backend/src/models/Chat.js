import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    userMessage:String,
    aiResponse:String,
    personality:String,
    usageDays:Number,
    lifeStyle:Object,
    createdAt: { type: Date, default: Date.now  }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;