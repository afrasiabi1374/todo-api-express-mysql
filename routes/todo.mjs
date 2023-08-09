import { Router } from "express";
import TodoController from "../controllers/TodoController.mjs";
const route = Router()
import  cors from "cors";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: './src/image/',
    filename: (req, file, cb) => {
        console.log('file =>>>>>>>>>', req.body.image);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage
})
route.get('/', cors() ,TodoController.all)
route.post('/add', cors(), upload.single('image'),TodoController.add)
route.delete('/delete', cors(), TodoController.deleteTodo)
route.put('/update', cors(), TodoController.updateTodo)
route.put('/did', cors(), TodoController.updateTodoDid)

export default route