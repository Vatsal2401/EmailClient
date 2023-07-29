function makeIsUserFolderExists({isUserFolderExist}){
    return async function isUserFolderExists({userfolder,databaseName}){
        try {
            return await isUserFolderExist({userfolder,databaseName})
         } catch (error) {
             throw error;
         }
    }
 }
module.exports=makeIsUserFolderExists;