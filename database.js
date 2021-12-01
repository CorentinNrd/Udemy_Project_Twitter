const mongoose = require("mongoose");
require('dotenv').config()

class Database {

    constructor() {
        this.connect();
    }

    async connect() {
        var env = process.env.MONGO_URL;
        try {
            await mongoose.connect(env,
                { useNewUrlParser: true },
                { useUnifiedTopolofy: true },
                { useFindAndModify: false });
            console.log("Database connection success!");
        } catch (err) {
            console.log("Database connection error!" + err);
        }
    }

}

module.exports = new Database();