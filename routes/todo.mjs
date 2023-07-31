import { Router } from "express";
import TodoController from "../controllers/TodoController.mjs";
import  cors from "cors";
const route = Router()
route.get('/', cors() ,TodoController.all)
route.post('/add', cors(), TodoController.add)
route.delete('/delete', cors(), TodoController.deleteTodo)
route.put('/update', cors(), TodoController.updateTodo)
route.put('/did', cors(), TodoController.updateTodoDid)

export default route