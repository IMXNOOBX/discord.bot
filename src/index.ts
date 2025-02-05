import 'dotenv/config';

// 🎯
import discord from './discord';
import handlers from './handlers';
import env from '@utils/env';

env(); // ⛳

discord.init(); // 📍
handlers.init(); // 🦆