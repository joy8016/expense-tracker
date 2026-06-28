import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// register controller for users

export async function registerController(req, res) {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "those field are must be required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "password must be of 6 characters",
    });
  }

  const ifUserExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (ifUserExists) {
    return res.status(400).json({
      success: false,
      message: "user already exists",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });
    const accessToken = jwt.sign(
      {
        id: newUser._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      {
        id: newUser._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "user created successfully",
      user: {
        userName: newUser.userName,
        email: newUser.email,
      },
      accessToken,
    });
  } catch (err) {
    console.log(`The error is ${err}`);
  }
}

// login controller for users

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel
    .findOne({
      email,
    })
    .select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "invalid email and password",
    });
  }

  try {
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "user login successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `internal server error ${err}`,
    });
  }
}

// getme controller

export async function getme(req, res) {
  try {
    const user = req.user;
    res.status(200).json({
      message: "fetched successfully",
      user: {
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `internal error ${err}`,
    });
    console.log(`the error is ${err}`);
  }
}

// update a  user profile

export async function userUpdate(req, res) {
  try {
    const userId = req.user.id;
    const { userName, email } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    // check if the email is already taken by another user
    if (email && email !== user.email) {
      const ifEmailExists = await userModel.findOne({ email });

      if (ifEmailExists) {
        return res.status(400).json({
          success: false,
          message: "email already taken by another user",
        });
      }
    }

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      {
        userName,
        email
      },
      { new: true, runValidators: true }
    ).select("userName email");

    res.status(200).json({
      message: "user update successfull",
      updateUser
    });

  } catch (err) {
    res.status(500).json({
      message: `internal error ${err}`,
    });
    console.log(`the error is ${err}`);
  }
}


// to change user password


export async function changePassword(req,res){

  const userId = req.user.id
  const {currentPassword, newPassword}=req.body

  if(!currentPassword || !newPassword){
    return res.status(400).json({
      
    })
  }
}