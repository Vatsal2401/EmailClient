function makeUpdateTokenAndSyncStatus({updateFolder,Joi,isFolderExists}){
    return async function UpdateTokenAndSyncStatus({folderdata,databaseName}){
        // const {error}=validateFolder({name:folderdata.name,id:folderId})
        // if (error) {
        //     throw new Error(error.message);
        // } 
        // const isFolder=await isFolderExists({userId:userId,databaseName});
        // if (isFolder.rows[0]) {
             return await updateFolder({folderdata,databaseName})
        // }
        // throw new Error("Folder does not Exists")
    }
    function validateFolder({name,id}){
        console.log(name,id);
        const schema=Joi.object({
            name:Joi.string().min(5).required(),
            id:Joi.number().integer().required()
        })
        // console.log(Joi);
        // console.log(schema);
        return schema.validate({name,id})
    }
 }

module.exports=makeUpdateTokenAndSyncStatus;