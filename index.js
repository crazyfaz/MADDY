require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'Hi') {
    message.reply('Hello🤗!');
  }
});

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'Help') {
    message.reply('📣ATTENTION @everyone this guy need help from you !🫵');
  }
});

// Use token from .env
client.login(process.env.TOKEN);

const http = require("http");
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);
