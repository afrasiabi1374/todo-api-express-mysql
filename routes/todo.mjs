import { Router } from "express";
import TodoController from "../controllers/TodoController.mjs";
import { log } from "../core/utils.mjs";
const route = Router()
route.get('/', TodoController.all)
route.post('/add', TodoController.add)
route.delete('/delete', TodoController.deleteTodo)
route.put('/update', TodoController.updateTodo)

export default route