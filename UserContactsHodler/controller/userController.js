const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const createUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    res.status(404);
    throw new Error("All feilds are nessary");
  }

  // const userAvialble = await User.findOne({ email });
  // if (userAvialble) {
  //   res.status(404);
  //   throw new Error("User already registered");
  // }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    password: hashPassword,
    email,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error(" User data not valid");
  }
});

// login
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(404);
    throw new Error("All feilds are nessary");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const acessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.SECRECT_KEY,
      { expiresIn: "1m" }
    );
    res.status(200).json({ acessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//current
const currentUser = asyncHandler(() => {
  console.log("*************");
});

// ----------------------------------------------------------------------------------

const getById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Can not find id");
  }
  res.status(200).json(user);
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(201).json({ users });
});

const updateById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Can not find id");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

const deleteById = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Can not find id");
  }
  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
  getAllUser,
  getById,
  createUser,
  loginUser,
  currentUser,
  updateById,
  deleteById,
};
