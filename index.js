const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();

// Replace with your bot token
const bot = new TelegramBot(process.env.BOT_TOKEN);
bot.setWebHook(`${process.env.BASE_URL}/${process.env.BOT_TOKEN}`);

// Middleware to parse the request body
app.use(express.json());

// Webhook endpoint
app.post(`/${process.env.BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start command handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the OCR Bot! Send me an image to extract text.');
});

// Add other bot handlers here
bot.on('message', (msg) => {
    if (msg.photo) {
        bot.sendMessage(msg.chat.id, "Received your image, processing...");
        // Handle the image and call your OCR API
    }
});

// Home route
app.get('/', (req, res) => {
    res.send('Hello, this is the Telegram Bot server.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
                                       
