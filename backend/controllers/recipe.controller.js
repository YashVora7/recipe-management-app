const recipeModel = require("../models/recipe.model");

const recipeAdd = async (req, res) => {
  let { title, ingredients, author } = req.body;

  try {
    let newRecipe = await recipeModel({
      title,
      ingredients,
      author,
      user: req.user,
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe Added Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Adding Recipe", details: error.message });
  }
};

const recipeGet = async (req, res) => {
  try {
    let recipes = await recipeModel.find({ user: req.user });

    res.status(201).json({ message: "Recipe List", recipes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Recipe", details: error.message });
  }
};

const recipeGetById = async (req, res) => {
  try {
    let { id } = req.params;
    let recipe = await recipeModel.findOne({ user: req.user, _id: id });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    res.status(201).json({ message: "Requested Recipe", recipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Recipe", details: error.message });
  }
};

const recipeUpdate = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, ingredients, author } = req.body;

    let recipe = await recipeModel.findOne({ user: req.user, _id: id });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }

    let updatedRecipe = await recipeModel.findByIdAndUpdate(
      { user: req.user, _id: id },
      { title, ingredients, author },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    res
      .status(201)
      .json({ message: "Recipe Updated Successfully", updatedRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Update Recipe", details: error.message });
  }
};

const recipeDelete = async (req, res) => {
  let { id } = req.params;
  try {
    let recipe = await recipeModel.findOne({ user: req.user, _id: id });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    let deletedRecipe = await recipeModel.findByIdAndDelete({
      user: req.user,
      _id: id,
    });
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    res
      .status(201)
      .json({ message: "Recipe Deleted Successfully", deletedRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Delete Recipe", details: error.message });
  }
};

module.exports = {
  recipeAdd,
  recipeGet,
  recipeGetById,
  recipeUpdate,
  recipeDelete,
};
