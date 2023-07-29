const TABLE_NAME="users";
function makeUserDb({cockroach}) {
    return Object.freeze({
      createUserEntry,
      getUserById,
      getAllUsers,
      deleteUserEntry,
      updateUserEntry,
      updateUserAccessToken,
      isUserEmailExist,
      isUserExist,
      getAllUserByExpiry,
      getAccessTokenByUserId
    });
    async function isUserExist({userId,databaseName}){
      const result= await cockroach.query(`select * from users where id=$1`,[userId])
      return result;
   }
    async function getUserById({id,databaseName}) {
        console.log("called");
        const result= await cockroach.query(`select * from users where id=$1`,[id])
        return result;
      }
    async function getAllUsers({databaseName}) {
        const result= await cockroach.query(`select * from users `)
        return result;
      }
    async function updateUserEntry({userdata, id,databaseName}) {
        const result= await  cockroach.query(`UPDATE users  SET name = $1 WHERE id=$2 `,[userdata.name,id])
        return result;
      }
    async function deleteUserEntry({id,databaseName}) {
        const result = await  cockroach.query(`DELETE FROM users WHERE id = $1`,[id])
        return result
      }
    async function updateUserAccessToken({id,access_token,access_token_expiry_date}) {
        const result = await  cockroach.query(`UPDATE users  SET access_token = $1 , access_token_expiry_date = $2 WHERE id=$3 `,[access_token,access_token_expiry_date,id])
        return result
      }
    async function createUserEntry({userdata,databaseName}) {
      // console.log("hj");
      try {
        console.log(userdata);
        const result = await cockroach.query('INSERT INTO users(name,email,access_token,refresh_token,access_token_expiry_date,picture,locale) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id', [userdata.name,userdata.email,userdata.access_token,userdata.refresh_token,userdata.access_token_expiry_date,userdata.picture,userdata.locale])
        // const result = await cockroach.query('INSERT INTO users(name,email,access_token,refresh_token) VALUES($1,$2,$3,$4) RETURNING id', [userdata.name,userdata.email,userdata.access_token,userdata.refresh_token])
      console.log(result); 
    return result;
      } catch (error) {
        console.log(error);
      }
    }
    async function isUserEmailExist({email,databaseName}){
       const result= await cockroach.query(`select * from  users where email=$1`,[email])
       return result;
    }
    async function getAllUserByExpiry({expiringtime,databasename})
    {
        const result=await cockroach.query( `select refresh_token,id from users where access_token_expiry_date<=$1;`,[expiringtime]); //1800000
        // console.log("getAllDbRelatedUser:::::",result.rows);
        return result.rows;
    }
    async function getAccessTokenByUserId({userId,databaseName})
    {
      const result= await cockroach.query(`select access_token from users where id=$1`,[userId])
      return result.rows[0].access_token;
    }
  } 
  module.exports = makeUserDb;
  