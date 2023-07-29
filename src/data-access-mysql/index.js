const config=require("../config")
const makeUserDb=require("./user.db")
const makeFolderDb=require("./folder.db")
const mysqlconnection=require("../utilities/MysqlConneciton/connectTomysql")

// const { Client } = require('pg')
 
// const client = new Client({
//   host: 'localhost',
//   port: 26257,
//   database: 'db2',
//   user: 'vatsal',
//   password: 'cockroach',
//   ssl: {
//     rejectUnauthorized: false,
//   },
// })
const mysql=mysqlconnection().promise();
// (async () => {
//     // await umzug.up();
//     await client.connect()
//   })();


 
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()

const userDb=makeUserDb({mysql})
const folderDb=makeFolderDb({mysql})

module.exports=Object.freeze({
    userDb,folderDb
})
