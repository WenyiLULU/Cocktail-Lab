const { Schema, model } = require("mongoose");
const Cocktail = require("./Cocktail.model.js")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    },
    // myRecipes: {
    //   type: Schema.Types.ObjectId, ref: Cocktail
    // },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const User = model("User", userSchema);
module.exports = User;
