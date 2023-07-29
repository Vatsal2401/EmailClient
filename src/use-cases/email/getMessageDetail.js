function getMessageDetail({axios,getUserAccessToken}){
    return async function getMessage({userId,messageId}){
      const accessToken=await getUserAccessToken({userId})
      const url=`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const params={
        format: 'full'
      }
      const response = await axios.get(url, {params,headers});
          return response;
    }
    function validateUser({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=getMessageDetail;