function makeGetAllFolderAction({getAllFolder}){
    return async function getAllFolderAction({userId,databaseName}){
        try {
            return await getAllFolder({databaseName,userId})
            
        } catch (error) {
            throw error
        }
    }
 }
module.exports=makeGetAllFolderAction;