const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../shemas/UserSchema");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }))

router.get("/", (req, res, next) => {
    res.status(200).render("login")
})

router.post("/", async (req, res, next) => {

    var playload = req.body;

    if (req.body.logUsername && req.body.logPassword) {
        var user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
            .catch((error) => {
                console.log(error);
                playload.errorMessage = "Something went wrong.";
                res.status(200).render("login", playload)
            });

        if (user != null) {
            var result = await bcrypt.compare(req.body.logPassword, user.password);

            if (result === true) {
                req.session.user = user;
                return res.redirect("/");
            }
        }

        playload.errorMessage = "Login credentials incorrect.";
        return res.status(200).render("login", playload)
    }

    playload.errorMessage = "Make sure each field have a valid value.";
    res.status(200).render("login")
})

module.exports = router;