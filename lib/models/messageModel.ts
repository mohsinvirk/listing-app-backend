import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
import { AdSchema } from "./adModel";

export const messageSchema = new Schema({
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
