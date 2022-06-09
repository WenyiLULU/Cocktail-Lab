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
        enum: ["Alcoholic", "Non alcoholic"]
    },
    author :{ type: Schema.Types.ObjectId, ref: User },
    ingredients: [{ingredient: {type: String}, amount: {type: String}}],
    steps: {type: String},
    image: {type: String, default: 'https://res.cloudinary.com/cocktail-lab/image/upload/v1654613700/Cocktail-Lab/martini-glass2_ctdpt3.jpg' },
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Cocktail = model("Cocktail", cocktailSchema);

module.exports = Cocktail;