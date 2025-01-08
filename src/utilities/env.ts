import log from './log';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'development' ? 
        ['.env.development.local', '.env.local'] :
        '.env.local'
})

const check_env = () => {
    const env = process.env;
    const env_file = process.env.NODE_ENV === 'development' ? '.env.development.local, .env.local, .env' : '.env.local, .env'

    log.info(`env - Running in ${env.NODE_ENV || 'production (default)'} mode ${env_file}`);

    if (!env.BOT_TOKEN) 
        throw new Error('BOT_TOKEN not found in environment variables');
}

export default check_env;