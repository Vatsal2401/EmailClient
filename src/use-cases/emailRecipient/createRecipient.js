function createEmailRecipientFun({axios,createEmailRecipientEntry,Joi}){
    return async function createEmailRecipient({email_id,filename,size,type,path}){
          const response =await createEmailRecipientEntry({email_id,filename,size,type,path})
          return response;
    }
    function validateEmailRecipient({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=createEmailRecipientFun;