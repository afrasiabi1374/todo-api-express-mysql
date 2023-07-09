class Db
{
    constructor(){

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dbtodo'
            })
            connection.connect()
            connection.query('SELECT * From todos', (err, rows, fields) => {
            if (err) throw err
            console.log('The solution is: ', rows)
            })
            connection.end()

    }
    
}
export default new Db()