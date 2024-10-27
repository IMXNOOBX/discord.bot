import 'dotenv/config';
import 'module-alias/register';

// 🎯
import discord from './discord';
import handlers from './handlers';
import env from './utilities/env';

env(); // ⛳

discord.init(); // 📍
handlers.init(); // 🦆