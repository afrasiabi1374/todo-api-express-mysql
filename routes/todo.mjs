import { Router } from "express";
import TodoController from "../controllers/TodoController.mjs";
import { log } from "../core/utils.mjs";
const route = Router()
route.post('/add', (req, res)=>{
    log(11111111111111)
})

export default route