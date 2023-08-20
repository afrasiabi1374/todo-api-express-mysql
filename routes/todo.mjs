import { Router } from "express";
import TodoController from "../controllers/TodoController.mjs";
const route = Router()
import  cors from "cors";
import multer from "multer";
import path from "path";
import { log } from "../core/utils.mjs";
const storage = multer.diskStorage({
    destination: 'views/public/images/',
    filename: (req, file, cb) => {
        let fileName = `${file.fieldname}_${Math.random()}_${Date.now()}${path.extname(file.originalname)}`
        req.image = fileName

        return cb(null, fileName)
    }
})
const upload = multer({
    storage: storage
})
route.get('/', cors() ,TodoController.all)
route.post('/add', [ cors(), upload.single('image') ],TodoController.add)
route.delete('/delete', cors(), TodoController.deleteTodo)
route.put('/update', cors(), TodoController.updateTodo)
route.put('/updateTodoImg',  [ cors(), upload.single('image') ], TodoController.updateTodoImg)

export default route