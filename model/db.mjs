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
                    if (err) { reject(err)}
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
                    log(rows)
                } catch (error) {
                    
                }
                
            })

        } catch (error) {
            log(error)
        }
    }
    

    deleteTodo(id){
        return new Promise(async (resolve, reject) => {
                    
            this.#connection.query(`DELETE FROM todos where id = ${id}`,  async(err, results, fields) => {
                if (err) {
                    throw err
                } else if(!results.affectedRows){
                    reject ('there is no task for delete')
                } else if(results.affectedRows){
                    resolve('task was deleted successfully!')
                }
                console.log('The solution is: ', results.affectedRows )
                // log(data)
                // this.#connection.end()
            })
        })
    }

    updateTodo(id, title, description){
        return new Promise(async (resolve, reject) => {
                    
            this.#connection.query(`UPDATE todos SET title = '${title}', description = '${description}'  WHERE id = ${id}`,  async(err, results, fields) => {
                if (err) {
                    throw err
                } else if(!results.affectedRows){
                    reject ('there is no task for update')
                } else if(results.affectedRows){
                    resolve('task was updated successfully!')
                }
                console.log('The solution is: ', results.affectedRows )
                // log(data)
                // this.#connection.end()
            })
        })
    }
}
export default new Db()