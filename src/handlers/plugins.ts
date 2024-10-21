import fs from 'fs';

export default async () =>{
    console.log('[PLUGINS] | Loading plugins...');

    const root = __dirname + '/../plugins/';
    
    if (!fs.existsSync(root)) 
        return console.log('[PLUGINS] | No plugins folder found, skipping...');

    const files = fs
            .readdirSync(root)
            .filter(file => 
                file.endsWith('.js') || file.endsWith('.ts')
            );

    if (
        !files || files.length < 1
    ) 
        return console.log('[PLUGINS] | No plugins found, skipping...');

    const plugins = new Map();

    for (const file of files) {
        let plugin;

        try {
            plugin = await import(`${root}/${file}`);
        } catch (e) {
            console.log('[PLUGINS] | Failed to load: ' + file + ', ' + e)
            continue;
        }

        if (plugin.disabled) 
            continue;

        if (
            !plugin.name ||
            !plugin.init || typeof plugin.init !== 'function'
        ) {
            console.log(`[PLUGINS] | Error loading: ${file} (missing name or init function)`)
            continue;
        }

        if (
            plugins.get(plugin.name)
        ) {
            console.log('[PLUGINS] | Already loaded module: ' + plugin.name)
            continue;
        }

        plugins.set(plugin.name, plugin);
    }

    if (!plugins)
        return console.warn('[PLUGINS] | No plugins loaded');

    console.log('[PLUGINS] | Loaded successfully, initializing...');

    for (let plugin of plugins.values())
        if (plugin.init && typeof plugin.init === 'function')
            plugin
                .init()
                .catch((e: any) => 
                    console.error(`[PLUGINS] | Error while initializing ${plugin.name}: ${e}`)
            );

    console.log(`[PLUGINS] | Loaded ${plugins.size}/${files.length} plugins`);
}