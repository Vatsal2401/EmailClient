function getMessagesUsingBatchRequest({axios}){
    return async function getMessages({accessToken,messageIds}){
        const batch = messageIds.map((messageId) => {
            return {
              method: 'GET',
              url: `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            };
          });
          const response = await axios.post(
            'https://www.googleapis.com/batch/gmail/v1',
            batch,
            {
              headers: {
                'Content-Type': 'multipart/mixed',
              },
            }
          );
          return response;

    }
    function validateUser({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=getMessagesUsingBatchRequest;