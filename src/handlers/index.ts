import fs from 'fs';
import log from "@/utilities/log";

const init = async () => {
    const root = __dirname;
    const handlers = fs
        .readdirSync(root)
        .filter(file => 
            file.endsWith('.js') || file.endsWith('.ts')
        );

    for (const handler of handlers) {
        if (handler.startsWith('index')) 
            continue;

        try {
            const han = await import(`${root}/${handler}`);
            await han.default();
            // log.info(`Handler ${handler} loaded`);
        } catch (error) {
            log.error(`handler - Error loading handler ${handler}: ${error}`);
        }
    }

    log.info(`handler - ${handlers.length} handlers loaded`);
}

export {
    init
};