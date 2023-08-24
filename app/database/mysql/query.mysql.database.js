const pool = require('./connection.database')

const query = async (sql)=>{
 return new Promise(async(resolve,reject)=>{
    pool.getConnection((err, connection) => {
        if (err) reject(err)
        connection.query(sql, (err, result) => {
            err ? reject(err) : resolve(result)
        });
        connection.release()
    });
 })
}

module.exports = query