import { getEnv, isJSON, log, random, sleep } from "./core/utils.mjs";
import Express from 'express'
import route from './routes/route.mjs'
import mysql from 'mysql'
class Application
{

    #app = null
    constructor()
    {
        this.#initExpress()
        this.#initRoute()

    }

    async #initExpress(){
        this.#app =  Express()
        this.#app.use(Express.urlencoded({
            extended: true,
            limit: '10mb'
        }))
        this.#app.use(Express.json({
            limit: '10mb'
        }))

    }

    async #initRoute(){
        this.#app.use('/', route)
    }

    async run(){
        const PORT = getEnv('PORT', 'number')
        this.#app.listen(PORT, async() => {
            log('app is running on port =>>>>'+ PORT)
        })
    }

}

export default new Application()