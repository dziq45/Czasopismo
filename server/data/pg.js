const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Dynks45',
    database:'mydb'
})

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    },
  }