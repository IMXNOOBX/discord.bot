import fs from 'fs';
import log from '@/utilities/log';

export default async () =>{
    log.info('plugins - Loading plugins...');

    const root = __dirname + '/../plugins/';
    
    if (!fs.existsSync(root)) 
        return log.warn('plugins - No plugins folder found, skipping...');

    const files = fs
            .readdirSync(root)
            .filter(file => 
                file.endsWith('.js') || file.endsWith('.ts')
            );

    if (
        !files || files.length < 1
    ) 
        return log.info('plugins - No plugins found, skipping...');

    const plugins = new Map();

    for (const file of files) {
        let plugin;

        try {
            plugin = await import(`${root}/${file}`);

            plugin = plugin.default || plugin;
        } catch (e) {
            log.warn('plugins - Failed to load: ' + file + ', ' + e)
            continue;
        }

        if (plugin.disabled) 
            continue;

        if (
            !plugin.name ||
            !plugin.init || typeof plugin.init !== 'function'
        ) {
            log.warn(`plugins - Error loading: ${file} (missing name or init function)`)
            continue;
        }

        if (
            plugins.get(plugin.name)
        ) {
            log.warn('plugins - Already loaded module: ' + plugin.name)
            continue;
        }

        plugins.set(plugin.name, plugin);
    }

    if (!plugins)
        return log.warn('plugins - No plugins loaded');

    log.info('plugins - Loaded successfully, initializing...');

    for (let plugin of plugins.values())
        if (plugin.init && typeof plugin.init === 'function')
            plugin
                .init()
                .catch((e: any) => 
                    log.error(`plugins - Error while initializing ${plugin.name}: ${e}`)
            );

    log.info(`plugins - Loaded ${plugins.size}/${files.length} plugins`);
}