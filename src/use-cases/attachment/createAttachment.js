function createAttachementFun({axios,createEmailAttachmentEntry,Joi}){
    return async function createAttachement({email_id,filename,size,type,path}){
          const response =await createEmailAttachmentEntry({email_id,filename,size,type,path})
          return response;
    }
    function validateEmailAttachment({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=createAttachementFun;