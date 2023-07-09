import BaseController from "../core/BaseController.mjs";
import { validationResult, body, query, param, header } from "express-validator";

class TodoController extends BaseController
{
    constructor(){
        super()
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
            const username = super.input(req.body.username)


        } catch (error) {
            

            
        }
    }

}
export  default new TodoController()