import mongoose from 'mongoose';

const djs_user_schema = new mongoose.Schema({
    username: String,
    email: String,
});

const djs_user = mongoose.model('djs_user', djs_user_schema);

export { djs_user_schema };
export default djs_user;