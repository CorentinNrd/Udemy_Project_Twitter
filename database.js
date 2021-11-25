const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect("mongodb+srv://Corentin:Roucmout79@twitterclonecluster.vaeyf.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority",
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