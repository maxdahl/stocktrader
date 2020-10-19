import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  originalPrice: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

portfolioSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

portfolioSchema.set("toJSON", {
  virtuals: true
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
