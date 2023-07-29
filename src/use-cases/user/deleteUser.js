function makeDeleteUserAction({deleteUser,isUserExist,Joi}){
    return async function deleteUserAction({id,databaseName}){
        const {error}=validateUser({id})
        if (error) {
            throw new Error(error.message);
        }
            const isUser=await isUserExist({userId:id,databaseName});
            console.log("isUser",isUser);
            if (isUser.rows[0]) {
                const result=await deleteUser({id,databaseName})  
                return result  
            }
            throw new Error("User with this Id is doesn't exists")
    }
    function validateUser({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }

module.exports=makeDeleteUserAction;