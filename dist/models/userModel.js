"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//   /lib/models/adModel.ts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    name: {
        type: String,
        required: "Enter title"
    },
    email: {
        type: String,
        required: "Select a category"
    },
    fcmtoken: {
        type: String
    },
    password: {
        type: String,
        required: "Enter price"
    },
    avatar: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=userModel.js.map