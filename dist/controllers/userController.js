"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel_1 = require("../models/userModel");
const User = mongoose.model("User", userModel_1.UserSchema);
class userController {
    addNewUser(req, res) {
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                return res.status(400).json({ email: "Email already Exists" });
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: 200,
                    r: "pg",
                    d: "mm" //Default
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err)
                            throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json({
                            email: user.email
                        }))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
    loginUser(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        // Find user in db
        User.findOne({ email }).then(user => {
            // If User exists
            if (!user) {
                return res.json({ email: "user not found" });
            }
            // Compare the hashed user.password with password
            bcrypt.compare(password, user.password).then(isMatch => {
                // If password Match successful
                if (isMatch) {
                    // User Matched
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar
                    };
                    // Sign Token
                    jwt.sign(payload, "PanacloudBootCamp", { expiresIn: 3600 }, (err, token) => {
                        res.json({
                            sucess: true,
                            token: "Bearer " + token
                        });
                    });
                }
                else {
                    return res.status(404).json({ error: "Not found" });
                }
            });
        });
    }
}
exports.userController = userController;
//# sourceMappingURL=userController.js.map