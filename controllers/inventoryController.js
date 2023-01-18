const Inventory = require("../models/inventoryModel");
const mongoose = require("mongoose");

// GET whole inventory
const getInventory = async (req, res) => {
  // Finds and returns all documents in the database in an array and sorts in alphabetical order
  const inventory = await Inventory.find({}).sort({ title: 0 });

  res.status(200).json(inventory);
};

// GET a single game
const getGame = async (req, res) => {
  // Grabbing ID property from the route parameter
  const { id } = req.params;

  // Checks if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Game could not be found" });
  }

  const game = await Inventory.findById(id);

  // If game cannot be found then return error
  if (!game) {
    return res.status(404).json({ err: "Game could not be found" });
  }

  res.status(200).json(game);
};

// CREATE a game
const createGame = async (req, res) => {
  const { title, copies, releaseDate, imgUrl } = req.body;

  // Add document to database
  try {
    // Creates a new document with 3 properties
    const inventory = await Inventory.create({
      title,
      copies,
      releaseDate,
      imgUrl,
    });
    // Sends the inventory document in json format and a status of 200 to say everything is ok
    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a game
const deleteGame = async (req, res) => {
  // Grabbing ID property from the route parameter
  const { id } = req.params;

  // Checks if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Game could not be found" });
  }

  const game = await Inventory.findOneAndDelete({ _id: id });

  // If game cannot be found then return error
  if (!game) {
    return res.status(404).json({ err: "Game could not be found" });
  }

  res.status(200).json(game);
};

// UPDATE a game
const updateGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Game could not be found" });
  }

  const game = await Inventory.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!game) {
    return res.status(404).json({ err: "Game could not be found" });
  }

  res.status(200).json(game);
};

module.exports = {
  getInventory,
  getGame,
  createGame,
  deleteGame,
  updateGame,
};
