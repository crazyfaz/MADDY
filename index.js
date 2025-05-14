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
    message.reply('Hello!');
  }
});

if(message.author.bot)return;

if(message.content === 'Thanks'){
message.reply('You are welcome 🤗');}

if(message.author.bot)return;

if(message.content === 'Who made you'){
message.reply('You should know that bitch crazy😂');}

if(message.author.bot)return;

if(message.content === 'Help'){
message.reply('Attention @everyone this guy need help from you📣

');}

// Use token from .env
client.login(process.env.TOKEN);

const http = require("http");
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);
