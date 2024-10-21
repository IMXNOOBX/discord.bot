import fs from 'fs';
import { client } from '@/discord';

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
            console.error(`Error loading event ${file}: ${err}`);
        }
    }

    console.log(`[EVENTS] | Loaded ${files.length} events`);
}