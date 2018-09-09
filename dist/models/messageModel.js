"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.messageSchema = new Schema({
    senderName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    senderMessage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=messageModel.js.map