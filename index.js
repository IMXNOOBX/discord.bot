const Discord = require('discord.js');
const { Webhook } = require('dis-logs');

const fs = require('fs');
const auth = require('dotenv').config()
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.DirectMessages
    ],
    //partials: [
    //    Discord.Partials.Channel, // Required to receive DMs
    //]
});




client.db = require('quick.db'); // Doing this, we will enable quick.db globaly: client.db.get(`info`) 
client.ms = require('ms');
client.config = require('./conf/config.json'); // Same with all of these
client.log = new Webhook(client.config.utils.log_webhook);

client.discord = Discord;
client.commands = new Discord.Collection();
client.commands.normal = new Discord.Collection();
client.events = new Discord.Collection();
client.commands.normal.aliases = new Discord.Collection();
client.commands.buttons = new Discord.Collection();
client.commands.menus = new Discord.Collection();
client.commands.slash = new Discord.Collection();


// Creating Command Handler Handler
var hands = ['hCommands', 'hEvents', 'hSlash'];
hands.forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.login(process.env.BOT_TOKEN).catch(err => {
    client.log.error('[BOT] | Login Error. Discord Response: ' + err);
});