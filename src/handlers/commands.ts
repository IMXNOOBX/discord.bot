import fs from 'fs';
import { commands, aliases } from '@/discord';

export default async () => {
    const root = __dirname + '/../discord/commands';
    const files = fs
        .readdirSync(root)
        .filter(file => 
            file.endsWith('.js') || file.endsWith('.ts')
        );

    for (const file of files) {
        let cmd = require(`${root}/${file}`);

        if (
            !cmd.name ||
            !cmd.run || typeof cmd.run !== 'function'
        ) 
            continue;

        commands.set(cmd.name, cmd);

        if (cmd.aliases && Array.isArray(cmd.aliases))
            cmd.aliases.forEach((alias: string) => aliases.set(alias, cmd.name));
    }

    console.log(`[COMMANDS] | Loaded ${commands.size} commands`);
}