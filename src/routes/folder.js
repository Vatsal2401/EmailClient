const express = require('express') 
const router = express.Router();
const {folderController}=require("../controllers")

// const connectionToMysql=require("../MysqlConneciton/connectTomysql");
// const connection=connectionToMysql().promise();
// const validateFolder=require("../middleware/folder/validateFolder")
// const createFolder=require("../services/createFolder");
// const fetchFolder=require("../middleware/folder/fetchFolder")
//api for  crud operation on folder

//CreateFolderApi
router.post("/",folderController.createFolder)
//api endpoint for particuler folder using id...
router.get("/:id",folderController.getFolderById)
//get All folder API
router.get("/",folderController.getAllFolder)
//UpdateFolder Api
router.put("/:id",folderController.updateFolder)
//deleteFolderApi
router.delete("/:id",folderController.deleteFolder)
module.exports=router;