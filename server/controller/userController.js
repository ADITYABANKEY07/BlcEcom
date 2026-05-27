const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const orderModel = require("../models/orderModel");

const signupUser = async (req, res) => {

  try {

    const {
      fullName,
      email,
      pass
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await userModel.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).send({

        msg:
          "Email already exists",

      });

    }

    // HASH PASSWORD
    const salt =
      await bcrypt.genSalt(10);

    const newPass =
      await bcrypt.hash(
        pass,
        salt
      );

    // CREATE USER
    await userModel.create({

      fullName,

      email,

      pass: newPass,

    });

    res.status(200).send({

      msg:
        "User signup successfully 🎉",

      status: 200,

    });

  } catch (error) {

    console.log(error);

    res.status(500).send({

      msg:
        error.message ||

        "Server Error",

    });

  }

};

const loginUser = async (req, res) => {
  try {
    let { email, pass } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ msg: "Invalid email", status: 400 });
    }
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(400).send({ msg: "Invalid password", status: 400 });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30 days",
    });

    res.status(200).send({
      user: {
        _id: user._id,
        name: user.fullName || user.name,
        email: user.email,
        image: user.image || null,
      },
      token: token,
      msg: "User login successfully 🎉",
      status: 200,
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", status: 500 });
  }
};

const userAuth = async (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "Okk", status: 200 });
};

const GetMyOrders = async (req, res) => {
  let { userId } = req.params;
  let order = await orderModel.find({ userId });
  res.send(order);
};

module.exports = {
  signupUser,
  loginUser,
  userAuth,
  GetMyOrders,
};
