function makeIsUserExists({isUserExist}){
    return async function isUserExists({userId,databaseName}){
        try {
            return await isUserExist({userId,databaseName})
         } catch (error) {
            throw error
         }
    }
 }
module.exports=makeIsUserExists;