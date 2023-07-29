const express = require('express') 
const router = express.Router();
const {userController}=require("../controllers")
// const mysql = require('mysql2/promise');
// const createFolder=require("../services/createFolder");
// const validateUser=require("../middleware/user/validateUser");
// const fetchUser=require("../middleware/user/fetchUser")
// api for  crud operation on user
router.post("/",userController.createUser)
router.get("/:id",userController.getUserById)
router.get("/",userController.getAlluser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)
module.exports=router;