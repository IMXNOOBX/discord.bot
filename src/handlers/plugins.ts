import fs from 'fs';
import log from '../utilities/log';
import discord from '../discord';

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
            discord.plugins.get(plugin.name)
        ) {
            log.warn('plugins - Already loaded module: ' + plugin.name)
            continue;
        }

        discord.plugins.set(plugin.name, plugin);
    }

    if (!discord.plugins)
        return log.warn('plugins - No plugins loaded');

    log.info('plugins - Loaded successfully, initializing...');

    for (let plugin of discord.plugins.values())
        if (plugin.init && typeof plugin.init === 'function') {
            const response = await plugin
                                        .init()
                                        .catch((e: any) => 
                                            log.error(`plugins - Error while initializing ${plugin.name}: ${e}`)
                                    );

            plugin.data = response;

            discord.plugins.set(plugin.name, plugin);
        }

    log.info(`plugins - Loaded ${discord.plugins.size}/${files.length} plugins`);
}