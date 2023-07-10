import mysql from 'mysql'
import { log } from '../core/utils.mjs'
class Db
{
    #connection
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
            let data =  await this.#connection.query('SELECT * FROM todos',  async(err, rows, fields) => {
                if (err) {throw err}
                // console.log('The solution is: ', rows)
                data = {...rows}
                // log(data)
                // this.#connection.end()
                // log(data)
            })
            log(data)

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