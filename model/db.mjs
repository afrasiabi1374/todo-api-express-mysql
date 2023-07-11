import mysql from 'mysql'
import { log } from '../core/utils.mjs'
class Db
{
    #connection
    #data = null  
    async setData(x){
        this.data =await  x
    }
    
    getData(){
        return this.data
    }
    constructor(){
        this.#connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dbtodo'
            })
        this.#connection.connect()

    }
     async allTodos(){

        try {
            return new Promise(async (resolve, reject) => {
                    
                await this.#connection.query('SELECT * FROM todos',  async(err, rows, fields) => {
                    if (err) {throw err}
                    // console.log('The solution is: ', rows)
                    // log(data)
                    // this.#connection.end()
                    await this.setData(rows)
                    resolve(this.getData())
                })
            })
       } catch (error) {
           log(error)
       }
    }
    addTodo(title, description){
        try {

             this.#connection.query(`INSERT INTO todos (title,description) VALUES ('${title}','${description}')`, (err, rows, fields) => {
                try {
                    
                    if (err) {throw err}
                    console.log('The solution is: ', rows)
                    this.#connection.end()
                } catch (error) {
                    
                }
                
            })

        } catch (error) {
            log(error)
        }
    }
    
}
export default new Db()