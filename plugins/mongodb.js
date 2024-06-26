const mongoose = require('mongoose');

/**
 * @brief MongoDB plugin to access MongoDB database
 * @param {Object} client - Discord client
 * @returns {Object} - MongoDB connection object and models
 */

// You can define here your schemas or make a subdirectory for them and other modules
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
});

const User = mongoose.model('User', userSchema);

module.exports = {
    name: 'mongodb',
    description: 'MongoDB plugin to access MongoDB database',
    disabled: (process.env.MONGO_HOST) ? false : true,
    init: async (client) => {
		if (
			!process.env.MONGO_HOST || 
			!process.env.MONGO_PORT || 
			!process.env.MONGO_DB
		) {
		    throw new Error(`MongoDB environment variables not set`);
		}

        const db_url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
        const db_name = process.env.MONGO_DB;

        client.log.console(`[MongoDB] | Connecting to ${db_url}/${db_name} ...`);


		mongoose.connect(`${db_url}/${db_name}`, { });
		const db = mongoose.connection;

        db.on('error', (err) => {
			throw new Error(`MongoDB connection error: ${err}`)
        });

        db.once('open', async () => {
			client.log.success(`Connected to MongoDB`);

            const collections = await mongoose.connection.db.listCollections().toArray();

			client.log.success(`Found ${collections.length} collections defined.`)
        });
        
        // You should return the database connection and the models you want to use
        return { db, models: { User } };
    },
}