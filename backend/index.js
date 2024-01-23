import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
import { todoRouter } from "./routes/TodoRouter.js";
import { authRouter } from "./routes/AuthRouter.js";



const PORT = process.env.PORT
const mongodb_uri = process.env.MONGODB_URI


const app = express()

app.use(express.json())
app.use(cors())

app.use('/todo', todoRouter)
app.use('/auth', authRouter)


mongoose
  .connect(mongodb_uri)
  .then(() => {
    console.log("Db is ok")
    app.listen(PORT, ()=> {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
    }
  )
  .catch(err=> {
    console.log(err)
  })

