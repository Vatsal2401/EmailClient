const { Client } = require('pg')
 
const client = new Client({
  host: 'localhost',
  port: 26257,
//   database: 'database-name',
  user: 'vatsal',
  password: 'cockroach',
  ssl: {
    rejectUnauthorized: false,
    // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
    // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
  },
})
await client.connect()
 
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
await client.end()

// const connectToCockroachDb=()=>{
//     return mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'admin',
//         // database: `${dbname}`
//       });
// }
// module.exports=connectToCockroachDb;