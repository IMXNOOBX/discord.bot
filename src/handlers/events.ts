import fs from 'fs';
import { client } from '@/discord';
import log from "@/utilities/log";

export default async () => {
    const root = __dirname + '/../discord/events';

    const files = fs
        .readdirSync(root)
        .filter(file => 
            file.endsWith('.js') || file.endsWith('.ts')
        );
        
    for (const file of files) {
        try {
            const e = await import(`${root}/${file}`);

            if (
                e.event && 
                typeof e.event !== 'string'
            ) 
                continue;

            e.event = e.event || file.replace('.js', '').replace('.ts', '');

            client.on(e.event, e.run);
        } catch (err) {
            log.error(`Error loading event ${file}: ${err}`);
        }
    }

    log.info(`events -  Loaded ${files.length} events`);
}