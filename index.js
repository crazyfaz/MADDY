const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000, () => console.log('Keep-alive server started on port 3000'));

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Target channel ID where the bot will listen/respond
const TARGET_CHANNEL_ID = '1367900838307303577';

client.once('ready', () => {
  console.log(`Logged in as Ｍ ΛＤＤƳ 亗#${client.user.discriminator}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return; // ignore bots

  // Only work if message is in the specific channel
  if (message.channel.id !== TARGET_CHANNEL_ID) return;

  const content = message.content.toLowerCase();

  // Simple text replies
  if (content === 'hi') {
    return message.reply('Hello🥰!');
  } else if (content === 'help') {
    return message.reply('⚠️ ATTENTION @everyone this guy need help from you! 🧑‍✈️');
  } else if (content === 'bye') {
    return message.reply('Goodbye! See you later! 👋');
  } else if (content === 'dee myre') {
    return message.reply('podaa pundachi mone👊');
  }

  // Time-based greetings logic
  if (content.includes('good morning') || content.includes('good evening') || content.includes('good night')) {
    const now = new Date();
    // Kerala (IST) offset: UTC +5:30
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const hour = istTime.getUTCHours();

    let reply = null;

    if (content.includes('good morning')) {
      if (hour >= 0 && hour < 12) reply = 'Good morning';
      else reply = "Sorry, I'm from Kerala, and this is not the exact time to say that.";
    } else if (content.includes('good evening')) {
      if (hour >= 12 && hour < 19) reply = 'Good evening';
      else reply = "Sorry, I'm from Kerala, and this is not the exact time to say that.";
    } else if (content.includes('good night')) {
      if (hour >= 19 && hour <= 23) reply = 'Good night';
      else reply = "Sorry, I'm from Kerala, and this is not the exact time to say that.";
    }

    if (reply) {
      return message.reply(reply);
    }
  }

  // Clear command
  if (message.content.startsWith('Delete')) {
    const ownerId = '1354501822429265921';
    if (message.author.id !== ownerId) {
      return message.reply("Only the bot owner can use this command.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention a user to delete their messages.');
    }

    try {
      const messages = await message.channel.messages.fetch({ limit: 100 });
      const userMessages = messages.filter(msg => msg.author.id === user.id);
      const deleted = await message.channel.bulkDelete(userMessages, true);
      return message.reply(`Deleted ${deleted.size} messages from ${user.tag}`);
    } catch (err) {
      console.error(err);
      return message.reply('Failed to delete messages. Note: Messages older than 14 days cannot be deleted.');
    }
  }
});

client.login(process.env.TOKEN);

const http = require('http');
http.createServer((req, res) => {
  res.write('Bot is running!');
  res.end();
}).listen(process.env.PORT || 3000);
