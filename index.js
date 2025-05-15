const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(process.env.PORT || 3000, () => console.log('Keep-alive server started on port 3000'));

require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers // Required for welcome messages
  ]
});

// Target channel for commands
const TARGET_CHANNEL_ID = '1367900838307303577';
// Welcome channel
const WELCOME_CHANNEL_ID = '1367915867085606955';

client.once('ready', () => {
  console.log(`Logged in as Ｍ ΛＤＤƳ 亗#${client.user.discriminator}`);
});

// Welcome message for new members
client.on('guildMemberAdd', member => {
  const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!welcomeChannel) return;

  const embed = new EmbedBuilder()
    .setTitle(`Yooo welcome ${member.user.username}!`)
    .setDescription(`Welcome <@${member.id}> into the creator crew server...😍♥️\nWe will always be with you babyyyy😉😅`)
    .setImage('https://i.postimg.cc/kgnb24R4/IMG-20250515-092414.jpg')
    .setColor('Random');

  welcomeChannel.send({ embeds: [embed] });
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // Ignore messages in welcome channel
  if (message.channel.id !== TARGET_CHANNEL_ID || message.channel.id === WELCOME_CHANNEL_ID) return;

  const content = message.content.toLowerCase();

  // Simple replies
  if (content === 'hi') return message.reply('Hello🥰!');
  if (content === 'help') return message.reply('⚠️ ATTENTION @everyone this guy need help from you! 🧑‍✈️');
  if (content === 'bye') return message.reply('Goodbye! See you later! 👋');
  if (content === 'dee myre') return message.reply('podaa pundachi mone👊');

  // Time-based greetings
  if (
    content.includes('good morning') ||
    content.includes('good afternoon') ||
    content.includes('good evening') ||
    content.includes('good night')
  ) {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const hour = istTime.getUTCHours();

    let reply = null;

    if (content.includes('good morning')) {
      reply = (hour >= 0 && hour < 12) ? 'Good morning' : "Sorry, I'm from Kerala, and this is not the exact time to say that.";
    } else if (content.includes('good afternoon')) {
      reply = (hour >= 12 && hour < 16) ? 'Good afternoon' : "Sorry, I'm from Kerala, and this is not the exact time to say that.";
    } else if (content.includes('good evening')) {
      reply = (hour >= 16 && hour < 19) ? 'Good evening' : "Sorry, I'm from Kerala, and this is not the exact time to say that.";
    } else if (content.includes('good night')) {
      reply = (hour >= 19 && hour <= 23) ? 'Good night' : "Sorry, I'm from Kerala, and this is not the exact time to say that.";
    }

    if (reply) return message.reply(reply);
  }

  // Delete command
  if (message.content.startsWith('Delete')) {
    const ownerId = '1354501822429265921';
    if (message.author.id !== ownerId) {
      return message.reply("Only the bot owner can use this command.");
    }

    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention a user to delete their messages.');

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
