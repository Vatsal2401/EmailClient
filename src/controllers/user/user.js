function makeUserController({userUseCase,Joi,createFolder}){

    return Object.freeze({
        getAlluser,
        getUserById,
        createUser,
        updateUser,
        deleteUser
    })
    
    async function getAlluser (req,res){
        try {
              const databaseName = req.headers.databasename;
              const result=await userUseCase.getAllUserAction({databaseName});
              res.status(200).json(result);
         } catch (error) {
            console.log(error);
              return res.status(400).json({ error: error });
         }      
    }
     async function getUserById(req,res){
        try {
                const databaseName = req.headers.databasename;
                const id=req.params.id;
                const result=await userUseCase.getUserByIdAction({id,databaseName});
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: error });
            }
    }
     async function createUser(req,res){
        
        // const databaseName = req.headers['databaseName']; 
        const DefaultFolders=[{
            name: 'Inbox',
            providerId: 1,
          },
          {
            name: 'Sent',
            providerId: 2,
          },
          {
            name: 'Archived',
            providerId: 3,
          },
          {
            name: 'Outbox',
            providerId: 4,
          },
          {
            name: 'Trash',
            providerId: 5,
          }]
        try {
            const {error}=   await  validateUser(req,res);
            if (error) return res.status(422).send(error.details[0].message);
            const userdata=req.body;
            const email=req.body.email;
            const databaseName = req.headers.databasename;
            const isEmail=await userUseCase.isUserEmailExist({email,databaseName});
            if (isEmail[0]) {
                return   res.status(400).json({ error: "sorry user with this email already exists" })
            }        
          const results= await  userUseCase.createUserAction({userdata,databaseName})
          console.log(results.rows[0].id);
        //   DefaultFolders.forEach(async(obj)=> await createFolderFun(results.insertId,obj,databaseName));
          DefaultFolders.forEach(async(obj)=> await createFolderFun(results.rows[0].id,obj,databaseName)); 
 
          return  res.status(201).json({success:results[0]})
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    async function deleteUser(req,res){
        try {
            const databaseName = req.headers.databasename;
            const id=req.params.id;
            const result=await userUseCase.deleteUserAction({id,databaseName})
            res.status(200).json({"success":"deleted","result":result})
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error });
        }
    }
    async function updateUser(req,res){
        try {
            const databaseName = req.headers.databasename;
            const id=req.params.id;
            const userdata=req.body;
            const result=await userUseCase.updateUserAction({userdata,id,databaseName})
            res.status(200).send({"success":"updated","result":result})
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    async function validateUser (req,res) {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
          });
         return schema.validate(req.body);
       
      }
    async function createFolderFun(userid,folderobj,databaseName){ 
        try {
            const folderdata={
                 name:folderobj.name,
                 providerId:folderobj.providerId,
                 userId:userid
            }
            const result=await createFolder({folderdata,databaseName})
        } catch (error) {
            return console.log({ error: error });
        }
    }

    
}

module.exports=makeUserController