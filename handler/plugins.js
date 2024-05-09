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
        let plugin = require(`../plugins/${file}`);

        if (
            !plugin.name ||
            !plugin.description ||
            !plugin.run || typeof plugin.run !== 'function'
        ) {
            client.log.error('[PLUGINS] | Failed to load: ' + file)
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

    client.log.console('[PLUGINS] | Loaded successfully!');

    for (let plugin of client.plugins.values())
        if (plugin.init && typeof plugin.init === 'function')
            plugin.init(client);

    client.log.console(`[PLUGINS] | Loaded ${client.plugins.size}/${files.length} plugins`);
}