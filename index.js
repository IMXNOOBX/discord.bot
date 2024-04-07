const Discord = require('discord.js');
const { Webhook } = require('dis-logs');

const fs = require('fs');
const auth = require('dotenv').config()
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.DirectMessages
    ],
    //partials: [
    //    Discord.Partials.Channel, // Required to receive DMs
    //]
});




client.ms = require('ms');
client.config = require('./config/config.json'); // Same with all of these
client.log = new Webhook(process.env.LOG_WEBHOOK);

client.discord = Discord;
client.commands = new Discord.Collection();
client.commands.normal = new Discord.Collection();
client.events = new Discord.Collection();
client.commands.normal.aliases = new Discord.Collection();
client.commands.buttons = new Discord.Collection();
client.commands.menus = new Discord.Collection();
client.commands.slash = new Discord.Collection();


// Load all handlers
const handlers = fs.readdirSync(`./handler`)
    .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

handlers
    .forEach(handler => {
        require(`./handler/${handler}`)(client);
    });

client
    .login(process.env.BOT_TOKEN)
    .catch(err => {
        client.log.error('[BOT] | Login Error. Discord Response: ' + err);
    });
