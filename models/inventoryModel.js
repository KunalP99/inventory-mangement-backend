const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    copies: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } // Adds a 'createdAt property and a 'lastUpdated' property
);

// Adding imgUrl to Schema
InventorySchema.add({ imgUrl: "string" });

module.exports = mongoose.model("Inventory", InventorySchema);
