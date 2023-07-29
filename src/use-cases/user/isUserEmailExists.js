function makeIsUserEmailExists({isUserEmailExist}){
    return async function isUserEmailExists({email,databaseName}){
        try {
            return await isUserEmailExist({email,databaseName})
         } catch (error) {
            throw error
         }
    }
 }
module.exports=makeIsUserEmailExists;