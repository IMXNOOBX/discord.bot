const { readdirSync } = require('fs')

module.exports = (client) => {
    client.log.console('[PLUGINS] | Loading plugins...');

    let files = [];

    try {
        files = readdirSync(`./plugins/`)
            .filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    } catch (e) {
        client.log.warn('[PLUGINS] | Plugins folder not found, skipping...');
        return;
    }

    if (
        !files || files.length < 1
    ) {
        client.log.console('[PLUGINS] | No plugins found, skipping...');
        return;
    }


    for (let file of files) {
        let plugin;

        try {
            plugin = require(`../plugins/${file}`);
        } catch (e) {
            client.log.error('[PLUGINS] | Failed to load: ' + file + ', ' + e)
            continue;
        }

        if (plugin.disabled) 
            continue;

        if (
            !plugin.name ||
            !plugin.init || typeof plugin.init !== 'function'
        ) {
            client.log.error(`[PLUGINS] | Error loading: ${file} (missing name or run function)`)
            continue;
        }

        if (
            client.plugins.get(plugin.name)
        ) {
            client.log.error('[PLUGINS] | Already loaded module: ' + plugin.name)
            continue;
        }

        client.plugins.set(plugin.name, plugin);
    }

    if (!client.plugins)
        return client.log.warn('[PLUGINS] | No plugins loaded');

    client.log.console('[PLUGINS] | Loaded successfully, initializing...');

    for (let plugin of client.plugins.values())
        if (plugin.init && typeof plugin.init === 'function')
            client[plugin.name] = plugin
                                    .init(client)
                                    .catch(e => client.log.error(`[PLUGINS] | Error while initializing ${plugin.name}: ${e}`));

    client.log.console(`[PLUGINS] | Loaded ${client.plugins.size}/${files.length} plugins`);
}