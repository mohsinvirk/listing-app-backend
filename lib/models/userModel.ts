//   /lib/models/adModel.ts
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
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
