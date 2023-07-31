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
            database: 'dbtodo',
            dateStrings: true

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
    addTodo(title, description, startAt, endAt, did){
        try {

             this.#connection.query(`INSERT INTO todos (title, description, startAt, endAt, did) VALUES ('${title}','${description}', '${startAt}','${endAt}', '${did}')`, (err, rows, fields) => {
                try {
                    
                    if (err) {throw err}
                    console.log('The solution is: ', rows)
                    log(rows)
                } catch (error) {
                    throw error
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

    updateTodoDid(id,did){
        return new Promise(async (resolve, reject) => {
                    
            this.#connection.query(`UPDATE todos SET  did = '${did}' WHERE id = ${id}`,  async(err, results, fields) => {
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
    updateTodo(id, title, description, startAt, endAt, did){
        return new Promise(async (resolve, reject) => {
                    
            this.#connection.query(`UPDATE todos SET   title = '${title}', description = '${description}', startAt = '${startAt}', endAt = '${endAt}', did = '${did}' WHERE id = ${id}`,  async(err, results, fields) => {
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