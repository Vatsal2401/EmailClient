function makeGetUserByIdAction({getUserById,Joi}){
    return async function getUserByIdAction({id,databaseName}){
        const {error}=validateUser({id})
        if (error) {
            throw new Error(error.message);
        }
         return await getUserById({id,databaseName})
    }
    function validateUser({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=makeGetUserByIdAction;