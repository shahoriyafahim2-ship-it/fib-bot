const { Telegraf, Markup } = require('telegraf');
const BOT_TOKEN = "8885661052:AAF0p3TMJUQBoRRLjulrsh3bYlzOjUyFZbw";
const WEBAPP_URL = "https://darling-stardust-125e7a.netlify.app";
const bot = new Telegraf(BOT_TOKEN);
bot.start(async (ctx) => {
  await ctx.reply(`🚀 Welcome to FREE INCOME BUX!\n\n✅ Earn by Watching Video`, Markup.inlineKeyboard([[Markup.button.webApp('💰 Open App & Earn', WEBAPP_URL)]]));
});
bot.launch();
console.log("Bot Started");
