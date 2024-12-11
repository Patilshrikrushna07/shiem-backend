const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");
const generateToken = require("../config/generateToken");

const register = asyncHandler(async (req, res) => {
  try {
    const { name, mobile_number, email, password } = req.body;
    if (!mobile_number || !email || !name) {
      errorResponse({ res, message: "Please fill required fields!" });
    }
    const emailExists = await Users.findOne({ email });
    const mobileExists = await Users.findOne({ mobile_number });

    if (emailExists) {
      errorResponse({ res, message: "Email already exists!" });
    }
    if (mobileExists) {
      errorResponse({ res, message: "Mobile number already exists!" });
    }
    const user = await Users.create({
      mobile_number,
      email,
      password: password ? password : "Test@123",
      name,
    });
    if (user) {
      const data = {
        _id: user._id,
        mobile_number: user.mobile_number,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
        name: user.name
      };
      successResponse({
        res,
        message: "user created successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    if (!email || !password) {
      errorResponse({ res, message: "Please fill required fields!" });
    }
    const user = await Users.findOne({ email });

    if (!user) {
      errorResponse({ res, message: "user does not exists!" });
    }
    console.log(user.password == password);
    if (user && (await user.matchPassword(password))) {
      const data = {
        _id: user._id,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      };
      successResponse({
        res,
        message: "user login successfully",
        data: data,
      });
    } else {
      errorResponse({ res, message: "Password not Match!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});
const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
      return errorResponse({ res, message: "Please fill all required fields!" });
    }

    const user = await Users.findOne({ email });
    console.log(user);
    if (!user) {
      return errorResponse({ res, message: "User not found!" });
    }

    const isMatch = await user.matchPassword(oldPassword);
    console.log(isMatch);
    if (!isMatch) {
      return errorResponse({ res, message: "Old password is incorrect!" });
    }

    user.password = newPassword;
    await user.save();

    successResponse({ res, message: "Password updated successfully!" });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getMemberInfo = asyncHandler(async (req, res) => {
  try {
  
    const user = await Users.findOne( {_id:req.params.id} );

    if (!user) {
      errorResponse({ res, message: "user does not exists!" });
    }
    else {
      successResponse({
        res,
        message: "user login successfully",
        data: user,
      });
    }

  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const edit = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      mobile_number,
      status
    } = req.body;
    if (!name || !mobile_number || !email ) {
      errorResponse({ res, message: "Please fill required fields!" });
    }

    const member = await Users.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        status: status,
        mobile_number: mobile_number,
        email: email
      },
      {
        new: true,
      }
    );
    if (member) {
      successResponse({
        res,
        message: "User Details Update Successfullt",
        data: member,
      });
    } else {
      errorResponse({ res, message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const remove = asyncHandler(async (req, res) => {
  try {
    const memberId = req.params.id;

    const member = await Users.findById(memberId);
    if (!member) {
      return errorResponse({ res, message: "Member not found!" });
    }

    await member.deleteOne();

    successResponse({
      res,
      message: "Member removed successfully",
      data: { memberId },
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const users = await Users.find();
    if (users) {
      successResponse({
        res,
        message: "Users fetched successfully",
        data: users,
      });
    } else {
      errorResponse({ res, message: "No Users data!" });
    }
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

module.exports = {
  login,
  register,
  updatePassword,
  getMemberInfo,
  edit,
  remove,
  getAll
};
