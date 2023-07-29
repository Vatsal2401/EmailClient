const TABLE_NAME="emailFolders"
function makeFolderDb({mysql,cockroach}) {
    return Object.freeze({
      createFolderEntry,
      getFolderById,
      getAllFolders,
      deleteFolderEntry,
      updateFolderEntry,
      isUserFolderExists
    });
    async function getFolderById({folderId,databaseName}) {
      const [result]= await mysql.query(`select * from ${databaseName}.emailFolders  where id=?`,[folderId])
        return result;
      }
    async function getAllFolders({databaseName}) {
      const [result]= await mysql.query(`select * from ${databaseName}.emailFolders`)
        return result;
      }
    async function updateFolderEntry({folderId, folderdata,databaseName}) {
       const [result]= await  mysql.query( `UPDATE ${databaseName}.emailFolders  SET name = ? WHERE id=? `,[folderdata.name,folderId])
        return result;
      }
    async function deleteFolderEntry({folderId,databaseName}) {
      const [result]= await mysql.query(`DELETE FROM ${databaseName}.emailFolders WHERE id = ?`,[folderId]);
        return result;
      }
    async function createFolderEntry({folderdata,databaseName}) {
      try {
        console.log(folderdata);
        const result= await cockroach.query(`INSERT INTO emailfolders(name,user_id,provider_id) VALUES ($1,$2,$3)`, [folderdata.name,folderdata.userId,folderdata.providerId])
        // const [result]= await cockroach.query(`INSERT INTO ${databaseName}.emailFolders(name,userId,providerId) VALUES (?,?,?)`, [folderdata.name,folderdata.userId,folderdata.providerId])
        return result;
      } catch (error) {
        console.log(error);
      }
     
    }

    ///here 
    async function isUserFolderExists({userfolder,databaseName}){
      try {
        const result=await mysql.query(`SELECT * FROM ${databaseName}.emailfolders where name='$1' and userId='$2'`,[userfolder.name,userfolder.userId]);

        // const [result]=await mysql.query(`SELECT * FROM ${databaseName}.emailFolders where name=? and userId=?`,[userfolder.name,userfolder.userId]);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  module.exports = makeFolderDb;
  