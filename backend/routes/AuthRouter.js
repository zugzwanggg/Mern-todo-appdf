import { Router } from "express";
import jwt from "jsonwebtoken";

export const authRouter = Router()

authRouter.post('/login', (req,res)=> {

  try {
    const token = jwt.sign({
      email: "mainkarft@gmail.com",
      password: "hitlerhitler"
    }, 'secret123')
  
    res.json({
      token
    })
  } catch(err) {
    res.status(500).json("Something wrong")
  }

})

authRouter.post('/signup', (req,res)=> {

})