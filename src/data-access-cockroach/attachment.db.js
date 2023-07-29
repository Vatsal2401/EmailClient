const TABLE_NAME="emailattachments"
function makeEmailAttachmentDb({cockroach}) {
    return Object.freeze({
        createEmailAttachmentEntry,
        deleteEmailAttachmentEntry,
        getEmailAttachments,
        getEmailAttachmentById

    });
    async function createEmailAttachmentEntry({email_id,filename,size,type,path}) {
      try {
        const result= await cockroach.query(`INSERT INTO ${TABLE_NAME}(email_id,filename,size,type,path) VALUES ($1,$2,$3,$4,$5)`, [email_id,filename,size,type,path])
        // const [result]= await cockroach.query(`INSERT INTO ${databaseName}.emailFolders(name,userId,providerId) VALUES (?,?,?)`, [folderdata.name,folderdata.userId,folderdata.providerId])
        return result;
      } catch (error) {
        console.log(error);
      }
     
    }
    async function deleteEmailAttachmentEntry({emailId,databaseName}) {
        const result= await cockroach.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`,[emailId]);
          return result;
        }
    async function getEmailAttachments({databaseName}){
        const result =await cockroach.query(`select * from  ${TABLE_NAME}`);
        return result;
    }
    async function getEmailAttachmentById({folderId,databaseName}) {
        const result= await cockroach.query(`select * from  ${TABLE_NAME} WHERE id=$1`,[folderId])
          return result;
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
  
  module.exports = makeEmailAttachmentDb;
  