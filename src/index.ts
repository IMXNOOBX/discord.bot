import 'dotenv/config';
import 'module-alias/register';

// No default export 😔
import * as discord from '@/discord';
import * as handlers from '@/handlers';
import env from '@/utilities/env';

env();

discord.init();
handlers.init();