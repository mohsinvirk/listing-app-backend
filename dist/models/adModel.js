"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//   /lib/models/adModel.ts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.AdSchema = new Schema({
    title: {
        type: String,
        required: "Enter title"
    },
    category: {
        type: String,
        required: "Select a category"
    },
    description: {
        type: String,
        required: "Enter Description"
    },
    price: {
        type: Number,
        required: "Enter price"
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: "Enter Name"
    },
    city: {
        type: String,
        required: "Enter city"
    },
    email: {
        type: String
    },
    phone: {
        type: Number,
        required: "Enter Phone Number"
    },
    favorite: {
        type: Boolean
    },
    file: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=adModel.js.map