import fs from 'fs';

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
            // console.log(`Handler ${handler} loaded`);
        } catch (error) {
            console.error(`Error loading handler ${handler}: ${error}`);
        }
    }

    console.log(`${handlers.length} handlers loaded`);
}

export {
    init
};