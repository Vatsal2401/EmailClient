function getUserAccessTokenAction({getAccessTokenByUserId,Joi}){
    return async function getUserAccessToken({userId,databaseName}){
        // const {error}=validateUser({id})
        // if (error) {
        //     throw new Error(error.message);
        // }
         return await getAccessTokenByUserId({userId,databaseName})
    }
    function validateUser({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=getUserAccessTokenAction;