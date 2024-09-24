const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  let { name, email, password } = req.body;
  let user = await userModel.findOne({ email });
  try {
    if (user) {
      return res.status(400).json({ error: "User already Exist" });
    }

    let newUser = new userModel({
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// OR

// const userRegister = async (req, res) => {
//     try {
//       let { name, email, password } = req.body;
//       let user = await userModel.findOne({ email });
//       if (user) {
//         res.status(400).json({ error: "User already Exist" });
//       } else {
//         let newUser = new userModel({
//           name,
//           email,
//           password,
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User Registered Successfully" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Server Error", details: error.message });
//     }
//   };

const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (password != user.password) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(201).json({ token, message: "User Logged in Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// OR

// const userLogin = async (req, res) => {
//     try {
//       let { email, password } = req.body;
//       let user = await userModel.findOne({ email });
//       if (!user) {
//         res.status(400).json({ error: "User not found" });
//       } else {
//         if (password != user.password) {
//           res.status(400).json({ error: "Password is incorrect" });
//         } else {
//           const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
//           res.status(201).json({ token, message: "User Logged in Successfully" });
//         }
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Server Error", details: error.message });
//     }
//   };

module.exports = { userRegister, userLogin };
