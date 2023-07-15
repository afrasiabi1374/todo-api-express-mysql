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
        // YYYY-MM-DD HH:MM dateformat
        await body('startAt').not().isEmpty().withMessage('title is required!').matches(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/).withMessage('date format wrong startAt').run(req)
        await body('endAt').not().isEmpty().withMessage('title is required!').matches(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/).withMessage('date format wrong endAt').run(req)
        return validationResult(req)
    }

    async add(req, res){
        try {
            // log(this.#todoValidation(req.req.body.title)?.errors[0]?.msg)
            const result = await this.#todoValidation(req)
            log(result)
            if (result.errors.length) {
                res.status(402).json({
                    msg: 'please insert value',
                    status: 402
                })
                
            }else{

                const title = await req.body.title
                const description = await  req.body.description
                const startAt = await  req.body.startAt
                const endAt = await  req.body.endAt
                const did = false

                    this.#DbTodo.addTodo(title, description,startAt, endAt, did)
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
        let id = Number(req.body.id)
        if(!isNaN(id)){
            const result = await this.#todoValidation(req)
            log(result.errors)
            if (!result.errors.length) {
                
                const id = await  req.body.id
                const title = await  req.body.title
                const description = await  req.body.description
                const startAt = await  req.body.startAt
                const endAt = await  req.body.endAt
                const did = await  req.body.did
                this.#DbTodo.updateTodo(id, title, description, startAt, endAt).then((resposnse)=>{
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
                res.status(402).json({
                    msg: 'bad request',
                    status: 402
                })
            }
        }else{
            res.status(400).json({
                msg: 'bad request',
                status: 400
            })
        }
    }

}
export  default new TodoController()