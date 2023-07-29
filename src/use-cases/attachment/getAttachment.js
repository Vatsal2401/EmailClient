function getAttachementUsingAPI({axios,getUserAccessToken,Joi}){
    return async function getAttachement({userId,messageId,attachmentId}){
      const accessToken=await getUserAccessToken({userId})
      const url=`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(url, {headers, responseType: 'arraybuffer'});
          return response;
    }
    function validateUser({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=getAttachementUsingAPI;