require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  const content = message.content.toLowerCase();

  if (content === 'hi') {
    message.reply('Hello🥰!');
  } else if (content === 'help') {
    message.reply('⚠️ ATTENTION @everyone this guy need help from you! 🧑‍✈️');
  } else if (content === 'Bye') {
    message.reply('Bye byeee🤗 take care❤️');
  }
});

client.login(process.env.TOKEN);

const http = require('http');
http.createServer((req, res) => {
  res.write('Bot is running!');
  res.end();
}).listen(process.env.PORT || 3000);
