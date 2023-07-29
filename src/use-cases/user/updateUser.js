function makeUpdateUserAction({updateUser,Joi,isUserExist}){
    return async function updateUserAction({userdata,id,databaseName}){
        
        const {error}=validateUser({name:userdata.name,id})
        if (error) {
            throw new Error(error.message);
        }
        const isUser=await isUserExist({userId:id,databaseName});
         if (isUser.rows[0]) {
            return await updateUser({userdata,id,databaseName})
         }
        throw new Error("user does not Exists")
    }
    function validateUser({name,id}){
        // console.log(name,id);
        const schema=Joi.object({
            name:Joi.string().min(5).required(),
            id:Joi.string().uuid()
        })
        return schema.validate({name,id})
    }
 }

module.exports=makeUpdateUserAction;