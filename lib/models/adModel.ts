//   /lib/models/adModel.ts
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AdSchema = new Schema({
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
