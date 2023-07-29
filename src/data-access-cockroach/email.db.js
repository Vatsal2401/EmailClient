const TABLE_NAME="emails"
function makeEmailDb({cockroach}) {
    return Object.freeze({
        createEmailEntry,
        deleteEmailEntry,
        getEmails,
        getEmailById

    });
    async function createEmailEntry({body_text,body_html,subject,thread_id,in_reply_to,user_id,is_read,is_trashed,is_archive,message_id,scheduled_at,snippet,databaseName}) {
      try {
        const result= await cockroach.query(`INSERT INTO ${TABLE_NAME}(body_text,body_html,subject,thread_id,in_reply_to,user_id,is_read,is_trashed,is_archive,message_id,is_scheduled,snippet) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`, [body_text,body_html,subject,thread_id,in_reply_to,user_id,is_read,is_trashed,is_archive,message_id,scheduled_at,snippet])
        // const [result]= await cockroach.query(`INSERT INTO ${databaseName}.emailFolders(name,userId,providerId) VALUES (?,?,?)`, [folderdata.name,folderdata.userId,folderdata.providerId])
        return result;
      } catch (error) {
        console.log(error);
      }
     
    }
    async function deleteEmailEntry({emailId,databaseName}) {
        const result= await cockroach.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`,[emailId]);
          return result;
        }
    async function getEmails({databaseName}){
        const result =await cockroach.query(`select * from  ${TABLE_NAME}`);
        return result;
    }
    async function getEmailById({folderId,databaseName}) {
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
  
  module.exports = makeEmailDb;
  