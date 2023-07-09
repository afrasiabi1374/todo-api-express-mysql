import { Router } from "express";
import todoRoute from './todo.mjs'

const route = Router()

route.use('/todo', todoRoute)

export default route