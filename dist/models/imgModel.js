"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//   /lib/models/adModel.ts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ImageSchema = new Schema({
    file: {
        type: String,
        required: "Select Image"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=imgModel.js.map