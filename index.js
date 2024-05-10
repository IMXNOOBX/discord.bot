require('dotenv').config()
const Discord = require('discord.js');
const { Webhook } = require('dis-logs');

const fs = require('fs');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,   /* required for CHAT commands, requires MESSAGE CONTENT INTENT */
        Discord.GatewayIntentBits.GuildMembers,     /* requires SERVER MEMBERS INTENT */
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.DirectMessages
    ],
    /**
     * @brief Partials are required to receive DMs
        partials: [
            Discord.Partials.Channel
        ]
     */
});

client.ms = require('ms');
client.log = new Webhook(process.env.LOG_WEBHOOK);

client.discord = Discord;

client.plugins = new Discord.Collection();
client.events = new Discord.Collection();

client.commands = new Discord.Collection();
client.commands.normal = new Discord.Collection();
client.commands.normal.aliases = new Discord.Collection();
client.commands.buttons = new Discord.Collection();
client.commands.menus = new Discord.Collection();
client.commands.slash = new Discord.Collection();

// Load all handlers
const handlers = fs.readdirSync(`./handler`)
    .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

handlers
    .forEach(handler => {
        try {
            require(`./handler/${handler}`)(client);
        } catch (e) {
            client.log.error('[HANDLER] | Error while loading: ' + handler + ', ' + e);
        }
    });

client
    .login(process.env.BOT_TOKEN)
    .catch(err => {
        client.log.error('[BOT] | Failed to log in. Discord response: ' + err);
    });
