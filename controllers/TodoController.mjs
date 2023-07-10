import BaseController from "../core/BaseController.mjs";
import { validationResult, body, query, param, header } from "express-validator";
import db from "../model/db.mjs";
import { log } from "../core/utils.mjs";

class TodoController extends BaseController
{
    #DbTodo
    constructor(){
        super()
        this.#DbTodo = db
    }
    async #todoValidation(req){
        await body('description').not().isEmpty().withMessage("description is require !").run(req)
        await body('title').not().isEmpty().withMessage('title is required!').run(req)
        return validationResult(req)
    }

    async add(req, res){
        try {
            
            const result = await this.#todoValidation(req)
            if (!result.isEmpty) {

                return res.send(result?.errors[0]?.msg)
                
            }
            const title = await req.body.title
            const description = await  req.body.description
            if (!title || !description) {
                console.log(title);
                res.status(402).json({
                    msg: 'please insert value',
                    status: 402
                })
            }else{
                this.#DbTodo.addTodo(title, description)
                res.status(201).json({
                    msg: 'todo is added',
                    status: 201
                })
            }
            

        } catch (e) {
            
            throw e
            
        }
    }

    all(req, res){
        try {
             'aaaa'+this.#DbTodo.allTodos()
            res.status(200).json(this.#DbTodo.allTodos())
        } catch (e) {
            throw e
        }
    }

}
export  default new TodoController()