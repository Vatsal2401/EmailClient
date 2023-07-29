function makeFolderController({folderUseCase,Joi}){
    const getAllFolder=async(req,res)=>{
        try {
             const databaseName = req.headers.databasename;
             const result=await folderUseCase.getAllFolderAction({databaseName});
             res.status(200).json(result);
             console.log(result);
        } catch (error) {
            return res.status(400).json({ error: error });
        }   
    }
    const getFolderById=async(req,res)=>{
        try {
          const databaseName = req.headers.databasename;
          const folderId=req.params.id;
          const result= await folderUseCase.getFolderByIdAction({folderId,databaseName})
          console.log(result);
          res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    const createFolder=async(req,res)=>{
        try {
            const databaseName = req.headers.databasename;
            const {error}=await validateFolder(req);
            if (error) return res.status(422).send(error.details[0].message);
            const folderdata=req.body;
            const userfolder={name:req.body.name,userId:req.body.userId}
            const isUserFolder=await folderUseCase.isUserFolderExists({userfolder,databaseName})
            if (isUserFolder[0]) {
                return   res.status(400).json({ error: "sorry user has already this folder" })
            }
            const result=await folderUseCase.createFolderAction({folderdata,databaseName})
            return  res.status(201).json({success:result[0]})
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    const deleteFolder=async(req,res)=>{
        try {
            const folderId=req.params.id;
            const databaseName = req.headers.databasename;
            const result=await folderUseCase.deleteFolderAction({folderId,databaseName})
            console.log(result);
            res.status(200).json({"success":"deleted","result":result})
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    const updateFolder=async(req,res)=>{
        try {
            const folderId=req.params.id;
            const folderdata=req.body;
            const databaseName = req.headers.databasename;
            const result=await folderUseCase.updateFolderAction({folderId,folderdata,databaseName})
            res.status(200).send({"success":"updated","result":result})
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    function validateFolder(req){
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            userId: Joi.number().required(),
            providerId: Joi.number().required()
          });
         return schema.validate(req.body);
    }
    return Object.freeze({
        getAllFolder,
        getFolderById,
        createFolder,
        deleteFolder,
        updateFolder
    })
    
}

module.exports=makeFolderController