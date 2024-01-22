import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
import TodoModel from "./models/TodoModel.js";



const PORT = process.env.PORT
const mongodb_uri = process.env.MONGODB_URI


const app = express()

app.use(express.json())
app.use(cors())


app.get('/todo/items', async (req,res)=> {
  try {
    const items = await TodoModel.find()

    if (!items) {
      return res.status(404).json("Not found")
    } else {
      return res.status(200).json(items)
    }
  } catch (err) {
    res.json(err)
  }
})

app.post('/todo/create', async (req,res)=> {
  try {
    const title = req.body.title
    const createTodo = await TodoModel.create({
      title: title
    })
    if (!createTodo) {
      return res.status(404).json('Something wrong')
    } else {
      return res.status(200).json('Succesfuly added')
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
})

app.put('/todo/edit/:id', async (req,res)=> {
  try {
    const id = req.params.id
    const editedTitle = req.body.title

    const editItem = await TodoModel.findByIdAndUpdate(id ,{title: editedTitle})

    if (!editItem) {
      return res.status(404).json('Something wrong')
    } else {
      return res.status(200).json('Succesfuly edited')
    }
  } catch (err) {
    res.status(500).json('Wrong')
  }
})

app.put('/todo/complete/:id', async (req,res)=> {
  try {
    const id = req.params.id
    const completed = req.body.completed

    const isComplited = await TodoModel.findByIdAndUpdate(id ,{completed: !completed})

    if (!isComplited) {
      return res.status(404).json('Something wrong')
    } else {
      return res.status(200).json('Succesfuly edited')
    }
  } catch (err) {
    res.status(500).json('Wrong')
  }
})

app.delete('/todo/delete/:id', async (req,res)=> {
  try {
    const id = req.params.id
    const deleteItem = await TodoModel.findByIdAndDelete({_id: id})

    if (!deleteItem) {
      return res.status(404).json("Something wrong")
    } else {
      return res.status(200).json('Succesfuly deleted')
    }

  } catch (err) {
    res.status(500).json("Wrong")
  }
})

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

