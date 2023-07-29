function makeCreateFolderAction({createFolder,Joi,isUserFolderExist}){
    return async function createFolderAction({folderdata,databaseName}){
        //    const {error}=   await  validateFolder(folderdata);
            // if (error) {
            //     throw new Error(error.message);
            // }
            const userfolder={name:folderdata.name,userId:folderdata.userId}
            const isUserFolder=await isUserFolderExist({userfolder,databaseName})
            console.log("in usecase",isUserFolder);
            if (isUserFolder.rows[0]) {
                throw Error("User has already this folder")
            }
            const result =await createFolder({folderdata,databaseName})
            return result;
       
    }
    async function validateFolder (folderdata) {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            userId: Joi.string().uuid().required(),
            providerId: Joi.number().integer().allow(null)        
  });
         return schema.validate(folderdata);
       
      }
 }

module.exports=makeCreateFolderAction;