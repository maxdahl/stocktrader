import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDubs: true
  },

  password: {
    type: String,
    required: true
  },

  funds: {
    type: Number,
    required: true,
    default: 10000
  },

  portfolio: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Portfolio"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true
});

userSchema.statics.createUser = async (email, password) => {
  const user = await new User({ email, password });
  user.password = await bcrypt.hash(user.password, 10);

  return user.save();
};

userSchema.statics.auth = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Password not match");

  return user.toJSON();
};

const User = mongoose.model("User", userSchema);

export default User;
