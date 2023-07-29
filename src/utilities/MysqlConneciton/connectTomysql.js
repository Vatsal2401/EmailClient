// const mysql = require('mysql2');
// const connectToMysql=()=>{
//     return mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'admin',
//         database: 'emailclient_migrations'
//       });
// }
// module.exports=connectToMysql;
const mysql = require('mysql2');
const connectToMysql=()=>{
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        // database: `${dbname}`
      });
}
module.exports=connectToMysql;
