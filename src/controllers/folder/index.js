const {folderUseCase}=require("../../use-cases");
const makeFolderController=require("./folder");
const Joi = require('joi');


const folderController=makeFolderController({folderUseCase,Joi});
module.exports=folderController;
