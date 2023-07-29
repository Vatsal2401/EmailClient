const TABLE_NAME="emailFolders"
function makeFolderDb({cockroach}) {
    return Object.freeze({
      createFolderEntry,
      getFolderById,
      getAllFolders,
      deleteFolderEntry,
      updateFolderEntry,
      isUserFolderExists,
      updateNextPageTokenAndSyncStatus
    });
    async function getFolderById({folderId,databaseName}) {
      const result= await cockroach.query(`select * from  emailFolders  where id=$1`,[folderId])
        return result;
      }
    async function getAllFolders({databaseName,userId}) {
      const result= await cockroach.query(`select * from  emailFolders WHERE user_id=$1 `,[userId])
        return result;
      }
    async function updateFolderEntry({folderdata,databaseName}) {
       const result= await  cockroach.query( `UPDATE emailFolders  SET provider_id = $1 WHERE user_id=$2 and name = $3 `,[folderdata.providerId,folderdata.userId,folderdata.name])
        return result;
      }
   async function updateNextPageTokenAndSyncStatus({folderdata,databaseName}){
    const result= await  cockroach.query( `UPDATE emailFolders  SET next_page_token = $1, sync_status=$2 WHERE user_id=$3 `,[folderdata.nextPageToken,folderdata.sync_status,folderdata.userId])
    return result;
   }
    async function deleteFolderEntry({folderId,databaseName}) {
      const result= await cockroach.query(`DELETE FROM emailFolders WHERE id = $1`,[folderId]);
        return result;
      }
    async function createFolderEntry({folderdata,databaseName}) {
      try {
        console.log(folderdata);
        const result= await cockroach.query(`INSERT INTO emailfolders(name,user_id,provider_id,priority) VALUES ($1,$2,$3,$4)`, [folderdata.name,folderdata.userId,folderdata.providerId,folderdata.priority])
        // const [result]= await cockroach.query(`INSERT INTO ${databaseName}.emailFolders(name,userId,providerId) VALUES (?,?,?)`, [folderdata.name,folderdata.userId,folderdata.providerId])
        return result;
      } catch (error) {
        console.log(error);
      }
     
    }

    ///here 
    async function isUserFolderExists({userfolder,databaseName}){
      try {
        const result=await cockroach.query(`SELECT * FROM emailfolders where user_id=$1 and provider_id=$2 OR name=$3`,[userfolder.userId,userfolder.providerId,userfolder.name,]);

        // const [result]=await cockroach.query(`SELECT * FROM ${databaseName}.emailFolders where name=? and userId=?`,[userfolder.name,userfolder.userId]);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
    
  }
  
  module.exports = makeFolderDb;
  