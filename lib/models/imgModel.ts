//   /lib/models/adModel.ts
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ImageSchema = new Schema({
  file: {
    type: String,
    required: "Select Image"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});
