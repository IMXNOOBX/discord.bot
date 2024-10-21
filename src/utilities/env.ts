const check_env = () => {
    const env = process.env;

    console.log(`Running in ${env.NODE_ENV || 'production #0'} mode`);

    if (!env.BOT_TOKEN) 
        throw new Error('BOT_TOKEN not found in environment variables');
}

export default check_env;