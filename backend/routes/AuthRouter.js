import { Router } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'

export const authRouter = Router()



authRouter.post('/signup', async (req,res)=> {
  try {
    const {email,password,passwordVerify} = req.body;
    

    // Validation
    if (!email || !password || !passwordVerify) return res.status(400).json({
      errorMessage: "Please enter ell required fields"
    });

    if (password.length <= 4) return res.status(400).json({
      errorMessage: "Your password is too short"
    });

    if (password !== passwordVerify) return res.status(400).json({
      errorMessage: "Your passwords are not matching"
    });

    // Check the user
    const exists = await UserModel.findOne({email});
    if (exists) {
      return res.status(400).json({
        errorMessage: "User already exists"
      })
    };

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the user

    const newUser = await UserModel.create({
      email, passwordHash
    });
    
    const savedUser = await newUser.save();

    // Log in the user as they signed up

    const token = jwt.sign({
      user: savedUser._id
    }, process.env.JWT_KEY);


    // send cookies

    res.cookie("token", token, {
      httpOnly: true
    });



  } catch (err) {
    console.error(err);
    res.status(500).json("Something wrong");
  }
})


authRouter.post('/login', async (req,res)=> {
  try {
    
    const {email, password} = req.body;

    // Validation

    if (!email, !password) return res.status(400).json({
      errorMessage: "Please enter ell required fields"
    });

    const existingUser = await UserModel.findOne({email})
    if (!existingUser) return res.status(401).json({
      errorMessage: "Wrong email or password"
    });

    const checkPassword = await bcrypt.compare(password, existingUser.passwordHash)
    if (!checkPassword) return res.status(400).json({
      errorMessage: "Wrong email or password"
    });

    // log in

    const token = jwt.sign({
      user: existingUser._id
    }, process.env.JWT_KEY);


    // send cookies

    res.cookie("token", token, {
      httpOnly: true
    });



  } catch(err) {
    console.error(err);
    res.status(500).json("Something wrong");
  }

})

authRouter.get('/logout', (req,res)=> {
  
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  }).send();

})