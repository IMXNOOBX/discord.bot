import Discord, { Client, Collection } from 'discord.js';
import log from "@utils/log";

const commands = new Collection<string, any>();
const aliases = new Collection<string, string>();
const plugins = new Collection<string, any>();

const client: Client = new Discord.Client({
    shards: 'auto',
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildWebhooks,
    ],
});

const init = async () => {
    await client
        .login(process.env.BOT_TOKEN)
        .catch(err => {
            log.error('bot - Failed to log in. Discord response: ' + err);
        });

    return client;
}


export default { 
    init, 

    client,
    commands, aliases,
    plugins
};