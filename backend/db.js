// Load environment variables
require('dotenv').config();

const MONGO_URL = process.env.MONGO_DB_CONNECTION_URL;

// backend/db.js
const mongoose = require('mongoose');

mongoose.connect(MONGO_URL).then(() => {

    console.log("Succesfully connected to the database");
}).catch(() => {

    console.log("Seems like an issue caused")
});

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    /* In simpler terms, ref: 'User' means that this userId is referencing an ID from the User collection. Mongoose can use this reference to automatically link an account to its corresponding user. */
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);



module.exports = {
    User,Account
};