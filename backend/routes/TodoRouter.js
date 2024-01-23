import { Router } from "express";
import TodoModel from "../models/TodoModel.js";
import checkAuth from "../middleware/checkAuth.js";

export const todoRouter = Router()

todoRouter.post('/create',checkAuth, async (req,res)=>{
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

todoRouter.get('/items',checkAuth, async (req,res)=> {
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


todoRouter.put('/edit/:id',checkAuth, async (req,res)=> {
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

todoRouter.put('/complete/:id',checkAuth, async (req,res)=> {
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

todoRouter.delete('/delete/:id',checkAuth, async (req,res)=> {
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