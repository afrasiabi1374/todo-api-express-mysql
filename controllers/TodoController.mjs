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
            

        } catch (err) {
            
            log('error in add function ', err)
            
        }
    }

    async all(req, res){
        try {
             this.#DbTodo.allTodos().then((result) => {
                // this.setData(result)
                res.status(200).json(result)
            }).catch((err) => {
                log('error in all function ', err)
            })
        } catch (e) {
            throw e
        }
    }

    async deleteTodo(req, res){
        try {
            if(!isNaN(req.body.id)){
                const id = await  req.body.id
                this.#DbTodo.deleteTodo(id).then((resposnse)=>{
                    res.status(200).json({
                        msg: resposnse,
                        status: 200
                    })
                }).catch((e)=>{
                    res.status(404).json({
                        msg: e,
                        status: 404
                    })
                })
            }else {
                res.status(400).json({
                    msg: 'bad request',
                    status: 400
                })
            }
            
        } catch (err) {
            log('error in deleteT function ', err)
        }
    }
    async updateTodo(req, res){
        if(!isNaN(req.body.id)){
            const id = await  req.body.id
            const title = await  req.body.title
            const description = await  req.body.description
            this.#DbTodo.updateTodo(id, title, description).then((resposnse)=>{
                res.status(200).json({
                    msg: resposnse,
                    status: 200
                })
            }).catch((e)=>{
                res.status(404).json({
                    msg: e,
                    status: 404
                })
            })
        }else{
            res.status(400).json({
                msg: 'bad request',
                status: 400
            })
        }
    }

}
export  default new TodoController()