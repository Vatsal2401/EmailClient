const TABLE_NAME="users";
function makeUserDb({mysql,cockroach}) {
    return Object.freeze({
      createUserEntry,
      getUserById,
      getAllUsers,
      deleteUserEntry,
      updateUserEntry,
      isUserEmailExist,
      isUserExist
    });
    async function isUserExist({userId,databaseName}){
      const [result]= await mysql.query(`select * from ${databaseName}.users where id=?`,[userId])
      return result;
   }
    async function getUserById({id,databaseName}) {
        const [result]= await mysql.query(`select * from ${databaseName}.users where id=?`,[id])
        return result;
      }
    async function getAllUsers({databaseName}) {
        const result= await mysql.query(`select * from ${databaseName}.users `)
        return result;
      }
    async function updateUserEntry({userdata, id,databaseName}) {
        const [result]= await  mysql.query(`UPDATE ${databaseName}.users  SET name = ? WHERE id=? `,[userdata.name,id])
        return result;
      }
    async function deleteUserEntry({id,databaseName}) {
        const [result]= await  mysql.query(`DELETE FROM ${databaseName}.users WHERE id = ?`,[id])
        return result
      }
    async function createUserEntry({userdata,databaseName}) {
      // console.log("hj");
      try {
        // const result = await cockroach.query(`PREPARE plan (VARCHAR(50),VARCHAR(50),VARCHAR(50)) AS
        // INSERT INTO ${databaseName}.${TABLE_NAME} (name,password,email) VALUES($1, $2, $3);
        // EXECUTE plan(${userdata.name}, ${userdata.password}, ${userdata.email})`, [userdata.name,userdata.password,userdata.email])
      // const result = await cockroach.query('INSERT INTO users(name,password,email) VALUES($1,$2,$3) RETURNING id', [userdata.name,userdata.password,userdata.email])
      // console.log(result);
      // const result1 = await cockroach.query('select id from  users where email=$1', [userdata.email])
      // console.log(result1.rows[0].id);

    const [result]= await  mysql.query(`INSERT INTO ${databaseName}.users(name,password,email) VALUES (?,?,?)`, [userdata.name,userdata.password,userdata.email] );
    return result;
      } catch (error) {
        console.log(error);
      }
     
    }
    async function isUserEmailExist({email,databaseName}){
       const [result]= await mysql.query(`select * from ${databaseName}.users where email=?`,[email])
       return result;
    }
  }
  
  module.exports = makeUserDb;
  