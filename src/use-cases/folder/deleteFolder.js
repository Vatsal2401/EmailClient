function makeDeleteFolderAction({deleteFolder,Joi,isFolderExists}){
    return async function deleteFolderAction({folderId,databaseName}){
        const {error} =  validateData({folderId});
        if (error) {
            throw new Error(error.message);
        }
        const isFolder=await isFolderExists({folderId:folderId,databaseName});
        if (isFolder.rows[0]) {
            return await deleteFolder({folderId,databaseName})
       }
       throw new Error("Folder does not Exists")  
    }
    function validateData({folderId})
    {
        const schema = Joi.object({
            folderId:Joi.number().integer().required()
        });
        
        return schema.validate({folderId});
    }
 }
module.exports=makeDeleteFolderAction;