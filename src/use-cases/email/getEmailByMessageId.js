function getEmailsByMessageId({axios}){
    return async function getEmails({accessToken,messageId}){
        // const {error}=validateUser({id})
        const headers = {
            'Authorization': `Bearer ${accessToken}`
          };
        const messageUrl = `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`;
        const response = await axios.get(messageUrl, { headers });
        // console.log(response);
        // if (error) {
        //     throw new Error(error.message);
        // }
         return response
    }
    function validateUser({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=getEmailsByMessageId;