const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 4000;

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
  const { email } = req.body;
  const newUser = await userModel.findOne({ email: email });
  if (newUser) {
    res.json({
      message: "Email is already registered",
    });
  } else {
    const newUser = new userModel({
      ...req.body,
    });
    const dataSave = await newUser.save();
    console.log(dataSave);
    res.json({
      message: "Sign up successfully",
      alert: true,
      data: dataSave,
    });
  }
});
//api login
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user) {
    const dataSend = {
      ...user._doc,
    };
    console.log(dataSend);
    return res.json({
      message: "Login is successfully",
      alert: true,
      data: dataSend,
    });
  } else {
    return res.json({
      message: "Email is not available, please sign up",
      alert: false,
    });
  }
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//save product in data
//api
app.post("/uploadProduct", async (req, res) => {
  console.log(req.body);
  const data = await productModel(req.body);
  const datasave = await data.save();
  console.log(datasave);
  res.send({ message: "Upload successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
