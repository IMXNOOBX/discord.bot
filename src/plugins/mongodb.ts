import mongoose from 'mongoose';
import log from "../utilities/log";

import schemas from './schemas';

/**
 * @brief MongoDB plugin to access MongoDB database
 * @param {Object} client - Discord client
 * @returns {Object} - MongoDB connection object and models
 */
export default {
    name: 'mongodb',
    description: 'MongoDB plugin to access MongoDB database',
    disabled: (process.env.MONGO_HOST) ? false : true,
    init: async () => {
		if (
			!process.env.MONGO_HOST || 
			!process.env.MONGO_PORT || 
			!process.env.MONGO_DB
		) {
		    throw new Error(`MongoDB environment variables not set`);
		}

        const db_url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
        const db_name = process.env.MONGO_DB;

        log.debug(`mongodb - Connecting to ${db_url}/${db_name} ...`);

		mongoose.connect(`${db_url}/${db_name}`, { });
		const db = mongoose.connection;

        db.on('error', (err: any) => {
			throw new Error(`MongoDB connection error: ${err}`)
        });

        db.once('open', async () => {
            log.info(`mongodb - Connected to ${db_url}/${db_name}`);

            const collections = await mongoose.connection.db?.listCollections().toArray();

            log.info(`mongodb - Found ${collections?.length} collections defined.`)
        });
        
        // You should return the database connection and the models you want to use
        return { db, models: schemas };
    },
}