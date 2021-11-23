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
    res.status(200).render("register")
})

router.post("/", async (req, res, next) => {

    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var playload = req.body;

    if (firstName && lastName && username && email && password) {
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
            .catch((error) => {
                console.log(error);
                playload.errorMessage = "Something went wrong.";
                res.status(200).render("register", playload)
            });

        if (user == null) {
            // no user found
            var data = req.body;
            data.password = await bcrypt.hash(password, 10);
            User.create(data)
                .then((user) => {
                    req.session.user = user;
                    console.log(req.session.user);
                    return res.redirect("/");
                })

        } else {
            // user found
            if (email == user.email) {
                playload.errorMessage = "Email already in use.";
            } else {
                playload.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", playload)
        }

    } else {
        playload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register", playload)
    }
})

module.exports = router;