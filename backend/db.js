// Load environment variables
require('dotenv').config();

const MONGO_URL=process.env.MONGO_DB_CONNECTION_URL;
console.log(MONGO_URL)
const mongoose = require("mongoose");
mongoose.connect(MONGO_URL)
    .then(() => {

        console.log("Succesfully connected to the database");
    })
    .catch(() => {

        console.log("Seems like an issue caused")
    });


const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})


const User = mongoose.model("User", userSchema);

User.create({
    username: "The Great Ashum2",
    password: "1234566",
    firstName: "Mahantam",
    lastName: "Ashu"
})
    .then((user) => {
        console.log("User created successfully:", user);
    })
    .catch((err) => {
        console.log("Error creating user:", err);
    });

module.exports = {
    User
}