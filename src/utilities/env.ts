import log from './log';

const check_env = () => {
    const env = process.env;

    log.info(`env - Running in ${env.NODE_ENV || 'production (default)'} mode`);

    if (!env.BOT_TOKEN) 
        throw new Error('BOT_TOKEN not found in environment variables');
}

export default check_env;