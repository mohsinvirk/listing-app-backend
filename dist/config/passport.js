"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const userModel_1 = require("../models/userModel");
const User = mongoose.model("User", userModel_1.UserSchema);
const keys = require("../config/keys");
const opts = {
    jwtFromRequest: "",
    secretOrKey: ""
};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(err => console.log(err));
    }));
};
//# sourceMappingURL=passport.js.map