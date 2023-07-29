function makeGetFolderByIdAction({getFolderById,Joi}){
    return async function getFolderByIdAction({folderId,databaseName}){
        // const {error} =  validateData({folderId});
        // if (error) {
        //     throw new Error(error.message);
        // }
            return await getFolderById({folderId,databaseName})
        
    }
    function validateData({folderId})
    {
        const schema = Joi.object({
            folderId:Joi.number().integer().required()
        });
        
        return schema.validate({folderId});
    }
 }
module.exports=makeGetFolderByIdAction;