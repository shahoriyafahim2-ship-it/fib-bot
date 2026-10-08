const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN missing in Environment!');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
console.log('Bot polling started...');

// For Render Web Service - to keep alive
const app = express();
app.get('/', (req, res) => {
  res.send('Fib Bot is Live!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! 👋\nSend me any number, e.g. 10\nI will send you Fibonacci series.');
});

// Fibonacci logic
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text.startsWith('/')) return;

  const n = parseInt(text);
  if (isNaN(n) || n <= 0) {
    bot.sendMessage(chatId, 'Please send a valid number > 0');
    return;
  }

  if (n > 100) {
    bot.sendMessage(chatId, 'Please send a number less than 100');
    return;
  }

  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  
  const result = fib.slice(0, n).join(', ');
  bot.sendMessage(chatId, `Fibonacci of ${n}:\n${result}`);
});

bot.on('polling_error', (err) => {
  console.log('Polling error:', err.message);
});
