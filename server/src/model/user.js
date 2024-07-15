import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    newsletterIsSubscribed: {
        type: Boolean,
        default: false
    },
    gAuth: {
        type: Object
    }
});

const User = mongoose.model('User', userSchema);

export default User;