import Discord, { Client, Collection } from 'discord.js';

const commands = new Collection<string, any>();
const aliases = new Collection<string, string>();
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
            console.error('[BOT] | Failed to log in. Discord response: ' + err);
        });

    return client;
}


export { 
    init, 

    client,
    commands, aliases 
};