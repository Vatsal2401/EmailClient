const {userUseCase,folderUseCase}=require("../../use-cases");
const makeUserController=require("./user");
const Joi = require('joi');
const userController=makeUserController({userUseCase,Joi,createFolder:folderUseCase.createFolderAction});
module.exports=userController;