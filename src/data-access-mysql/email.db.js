const TABLE_NAME="emails"
function makeFolderDb({mysql,cockroach}) {
    return Object.freeze({
      createFolderEntry,
      
    });
    async function createEmailEntry({folderdata,databaseName}) {
      try {
        const result= await cockroach.query(`INSERT INTO ${TABLE_NAME}(name,user_id,provider_id) VALUES ($1,$2,$3)`, [folderdata.name,folderdata.userId,folderdata.providerId])
        // const [result]= await cockroach.query(`INSERT INTO ${databaseName}.emailFolders(name,userId,providerId) VALUES (?,?,?)`, [folderdata.name,folderdata.userId,folderdata.providerId])
        return result;
      } catch (error) {
        console.log(error);
      }
     
    }

    ///here 
    // async function isUserFolderExists({userfolder,databaseName}){
    //   try {
    //     const result=await mysql.query(`SELECT * FROM ${databaseName}.emailfolders where name='$1' and userId='$2'`,[userfolder.name,userfolder.userId]);

    //     // const [result]=await mysql.query(`SELECT * FROM ${databaseName}.emailFolders where name=? and userId=?`,[userfolder.name,userfolder.userId]);
    //     return result;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }
  
  module.exports = makeFolderDb;
  