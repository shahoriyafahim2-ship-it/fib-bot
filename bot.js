const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.get('/', (req, res) => res.send('Bot is Running!'));
app.listen(process.env.PORT || 10000);

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

console.log('Bot started...');

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Bot is Online! Ready.');
});

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/start')) {
    bot.sendMessage(msg.chat.id, `Received: ${msg.text}`);
  }
});
