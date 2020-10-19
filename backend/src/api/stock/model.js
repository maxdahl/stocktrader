import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDubs: true
  },

  price: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

stockSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

stockSchema.set("toJSON", {
  virtuals: true
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
