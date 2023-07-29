function makeCreateEmailAction({createEmail,Joi}){
    return async function createEmailAction({body_text,body_html,subject,thread_id,in_reply_to,user_id,is_read,is_trashed,is_archive,message_id,scheduled_at,snippet,databaseName}){
            //    const {error}=   await  validateEmail(folderdata);
            // if (error) {
            //     throw new Error(error.message);
            // }
            const result =await createEmail({body_text,body_html,subject,thread_id,in_reply_to,user_id,is_read,is_trashed,is_archive,message_id,scheduled_at,snippet,databaseName})
            return result;
       
    }
    async function validateEmail (folderdata) {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            userId: Joi.string().uuid().required(),
            providerId: Joi.number().integer().allow(null)        
  });
         return schema.validate(folderdata);
       
      }
 }

module.exports=makeCreateEmailAction;