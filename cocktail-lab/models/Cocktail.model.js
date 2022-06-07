const { Schema, model } = require("mongoose");
//const { arrayBuffer } = require("stream/consumers");

const User = require("./User.model.js")

const cocktailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Alcoholic", "No-Alcoholic"]
    },
    author :{ type: Schema.Types.ObjectId, ref: User },
    ingredients: [{ingredient: {type: String}, amount: {type: String}}],
    steps: {type: String},
    image: {type: String, default: '../public/images/martini-glass2.jpg'},
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Cocktail = model("Cocktail", cocktailSchema);

module.exports = Cocktail;