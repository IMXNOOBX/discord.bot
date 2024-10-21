import Discord, { Client, Collection } from 'discord.js';
import log from "@/utilities/log";

const commands = new Collection<string, any>();
const aliases = new Collection<string, string>();
const plugins = new Collection<string, any>();
var client: Client;

const init = async () => {
    client = new Discord.Client({ // Client instance
        intents: [
            Discord.GatewayIntentBits.Guilds,
            Discord.GatewayIntentBits.GuildMessages,
            Discord.GatewayIntentBits.GuildMembers,
            Discord.GatewayIntentBits.GuildWebhooks,
        ],
    });

    await client
        .login(process.env.BOT_TOKEN)
        .catch(err => {
            log.error('bot - Failed to log in. Discord response: ' + err);
        });

    return client;
}


export { 
    init, 

    client,
    commands, aliases,
    plugins
};