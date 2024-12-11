const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    mobile_number: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      required: true,
      default: 'Team Member'
    },
    isAdmin: {
      type: Number,
      required: true,
      default: 0
    },
    status:{
      type: Number,
      required: true,
      default: 1
    },
  },
  {
    timestamps: true,
  }
);

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userModel.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Users = mongoose.model("users", userModel);
module.exports = Users;
