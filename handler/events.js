const { readdirSync } = require('fs')

module.exports = (client) => {
    client.log.console('[EVENTS] | Loading event listeners...');

    const files = readdirSync('./events/')
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        
    for (let file of files) {

        try {
            let ev = require(`../events/${file}`);

            if (
                ev.event && 
                typeof ev.event !== 'string'
            ) {
                continue;
            }

            ev.event = ev.event || file.replace('.js', '')
            client.on(ev.event, ev.run.bind(null, client))
        } catch (err) {
            client.log.error('[EVENTS] | Error while loading: ' + file + '\nDiscord Response: ' + err);
        }
    }

    client.log.console('[EVENTS] | Listeners loaded sucessfully!');
}