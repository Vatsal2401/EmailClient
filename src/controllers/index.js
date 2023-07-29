const userController=require("./user/index")
const folderController=require("./folder/index")
const authController=require("./auth/index")
const controller = Object.freeze({
    userController,
    folderController,
    authController
  });
  module.exports=controller;